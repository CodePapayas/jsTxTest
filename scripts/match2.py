import pymongo
import numpy as np
from pymongo import MongoClient

uri = "mongodb+srv://CodePapayas:Pistachios2050@cluster0.crlnuvw.mongodb.net/?retryWrites=true&w=majority"

try: 
    client = MongoClient(uri)
    db = client.AnswerObjects
    providers_collection = db.ProviderAnswers
    patients_collection = db.PatientAnswers

except pymongo.errors.ConnectionFailure as e:
    print("Could not connect to MongoDB: %s" % e)

# Fetch data from the collections.
providers_data = list(providers_collection.find())
all_patients_data = list(patients_collection.find())

def strict_filter(patient_criteria, all_providers):
    strict_criteria = ['gender', 'race', 'age', 'lgbt']
    remaining_providers = all_providers[:]

    for criterion in strict_criteria:
        preference_value = patient_criteria.get(criterion)

        if preference_value is not None:  # Ensure the preference value is not null
            remaining_providers = [
                provider for provider in remaining_providers
                if provider.get(criterion) == preference_value
            ]

    return remaining_providers

def cosine_similarity(a, b):
    norm_a = np.linalg.norm(a)
    norm_b = np.linalg.norm(b)

    if norm_a == 0 or norm_b == 0:
        return 0.0  # Return 0 if either of the norms is zero to avoid division by zero.

    dot_product = np.dot(a, b)
    norm_a = np.linalg.norm(a)
    norm_b = np.linalg.norm(b)

    # Check for zero division or NaN values
    if norm_a == 0.0 or norm_b == 0.0 or np.isnan(dot_product):
        return 0.0

    print("this is the dot product", dot_product / (norm_a * norm_b))
    return dot_product / (norm_a * norm_b)

def generate_vector_for_patient(patient_doc, provider_doc):
    vector = []

    symp_cosine_sim = cosine_similarity(np.array(patient_doc['sympData']), np.array(provider_doc['sympData']))
    pop_cosine_sim = cosine_similarity(np.array(patient_doc['popData']), np.array(provider_doc['popData']))
    
    vector.extend([symp_cosine_sim, pop_cosine_sim])
 
    return vector


for patient_data in all_patients_data:
    matched_providers = strict_filter(patient_data, providers_data)
    print(f"Matched providers for patient {patient_data['firstName']} {patient_data['lastName']}:")

    for provider in matched_providers:
        patient_vector = generate_vector_for_patient(patient_data, provider) # Use 'provider' here, not 'providers_data'
        provider_vector = generate_vector_for_patient(provider, patient_data)
        
        print("Patient Vector:", patient_vector, "Provider Vector:", provider_vector) # Switch places here too
        
        similarity_score = cosine_similarity(patient_vector, provider_vector)
        print("This is the similarity score:", similarity_score)
        
        print(provider)  
    print("------")



