import pymongo
from pymongo import MongoClient
from copy import deepcopy
import numpy as np
import csv
import textdistance

uri = "mongodb+srv://CodePapayas:Pistachios2050@cluster0.crlnuvw.mongodb.net/?retryWrites=true&w=majority"


try: 
    client = MongoClient(uri)
    db = client.AnswerObjects
    collection1 = db.ProviderAnswers
    collection2 = db.PatientAnswers

except pymongo.errors.ConnectionFailure as e:
    print("Could not connect to MongoDB: %s" % e)

all_modalities = ["emdr", "cbt", "dbt", "ift", "aft", "motInt", "cft"]

def cosine_similarity(v1, v2):
    # Ensure the two vectors are of the same size.
    if len(v1) != len(v2):
        raise ValueError("Vectors are not the same size.")
    
    dot_product = np.dot(v1, v2)
    norm_v1 = np.linalg.norm(v1)
    norm_v2 = np.linalg.norm(v2)

    # Check for zero division or NaN values
    if norm_v1 == 0.0 or norm_v2 == 0.0 or np.isnan(dot_product):
        return 0.0

    return dot_product / (norm_v1 * norm_v2)




# def strict_filter(patient_data, all_providers):
#     # Mapping patient preference keys to provider keys
#     preference_mapping = {
#         'gender preference': 'Gender',
#         'age preference': 'Age',
#         'same race?': 'race',
#         'lgbt match?': 'lgbt'
#     }

#     remaining_providers = deepcopy(all_providers)  # Start with the full list

#     for preference_key, provider_key in preference_mapping.items():
#         current_filtered_providers = []
#         preferences = patient_data.get(preference_key, {})

#         # Handle "Choice" vs "Preference" keys
#         patient_preference = preferences.get('Preference', preferences.get('Choice', []))
#         patient_importance = preferences.get('Importance', [])
#         if patient_preference is None:
#             patient_preference = []
#         if patient_importance is None:
#             patient_importance = []

#         # Check for preferences with "Extremely Important (1)" first
#         for preference, importance in zip(patient_preference, patient_importance):
#             if importance == "1":
#                 current_filtered_providers.extend([provider for provider in remaining_providers if preference == provider.get(provider_key, "")])

#         # If no matches found for importance level "1", check for "0"
#         if not current_filtered_providers:
#             for preference, importance in zip(patient_preference, patient_importance):
#                 if importance == "0":
#                     current_filtered_providers.extend([provider for provider in remaining_providers if preference == provider.get(provider_key, "")])

#         # Update the remaining_providers list for the next preference key
#         if current_filtered_providers:
#             remaining_providers = current_filtered_providers

#     print(remaining_providers)
#     return remaining_providers








# def generate_vector_for_patient(patient_doc, provider_doc):
#     vector = []
    
#     # tx_gender_distance = textdistance.jaro_winkler.normalized_similarity(patient_doc.get('gender preference', {}).get('Gender', ""), provider_doc.get('Gender', ""))
#     # tx_age_distance = textdistance.jaro_winkler.normalized_similarity(patient_doc.get('age preference', {}).get('Age', ""), provider_doc.get('Age', ""))
#     # race_distance = textdistance.jaro_winkler.normalized_similarity(patient_doc.get('same race?', {}), provider_doc.get('race', ""))
#     # lgbt_distance = textdistance.jaro_winkler.normalized_similarity(patient_doc.get('lgbt match?', {}), provider_doc.get('lgbt', ""))
#     # modal_distance = textdistance.jaro_winkler.normalized_similarity(" ".join(patient_doc['modal']), " ".join(provider_doc['modal']))
    
#     # vector.extend([tx_gender_distance, tx_age_distance, race_distance, lgbt_distance, modal_distance])
    
#     symp_cosine_sim = vector_cosine_similarity(np.array(patient_doc['sympData']), np.array(provider_doc['sympData']))
#     pop_cosine_sim = vector_cosine_similarity(np.array(patient_doc['popData']), np.array(provider_doc['popData']))
    
#     vector.extend([symp_cosine_sim, pop_cosine_sim])

#     # print(vector)
    
    
#     return vector




# def cosine_similarity(a, b):
#     norm_a = np.linalg.norm(a)
#     norm_b = np.linalg.norm(b)

#     if norm_a == 0 or norm_b == 0:
#         return 0.0  # Return 0 if either of the norms is zero to avoid division by zero.

#     dot_product = np.dot(a, b)
#     norm_a = np.linalg.norm(a)
#     norm_b = np.linalg.norm(b)

#     # Check for zero division or NaN values
#     if norm_a == 0.0 or norm_b == 0.0 or np.isnan(dot_product):
#         return 0.0

#     print("this is the dot product", dot_product / (norm_a * norm_b))
#     return dot_product / (norm_a * norm_b)


for patient_doc in collection2.find():
    patient_id = patient_doc['_id']

    # Get the filtered list of providers
    filtered_providers = strict_filter(patient_doc, list(collection1.find()))
    print("Number of filtered providers after strict_filter:", len(filtered_providers))

    # If there are no filtered providers, continue with the next patient
    if not filtered_providers:
        continue

    similarities = []
    for provider_doc in filtered_providers:
        provider_id = provider_doc['_id']

        patient_vector = generate_vector_for_patient(patient_doc, provider_doc)
        provider_vector = generate_vector_for_patient(provider_doc, patient_doc)

        similarity_score = cosine_similarity(patient_vector, provider_vector)
        similarities.append((provider_id, similarity_score))
    
    # Sort and retrieve top matches
    top_matches = sorted(similarities, key=lambda x: x[1], reverse=True)[:3]
    results.append((patient_id, top_matches))



# Writing results to CSV
with open('cosine_similarity_results.csv', 'w', newline='') as csvfile:
    fieldnames = ['Patient Name', 'First Match Provider Name', 'First Match Cosine Similarity', 'Second Match Provider Name', 'Second Match Cosine Similarity', 'Third Match Provider Name', 'Third Match Cosine Similarity']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()

    for patient_id, top_matches in results:
        patient_data = collection2.find_one({'_id': patient_id})
        patient_first_name = patient_data['firstName']
        patient_last_name = patient_data['lastName']
        patient_name = f"{patient_first_name} {patient_last_name}"

        row = {'Patient Name': patient_name}

        for i, (provider_id, similarity) in enumerate(top_matches[:3]):
            provider_data = collection1.find_one({'_id': provider_id})
            provider_first_name = provider_data['firstName']
            provider_last_name = provider_data['lastName']
            provider_name = f"{provider_first_name} {provider_last_name}"

            row[f'{"First" if i == 0 else "Second" if i == 1 else "Third"} Match Provider Name'] = provider_name
            row[f'{"First" if i == 0 else "Second" if i == 1 else "Third"} Match Cosine Similarity'] = similarity

        writer.writerow(row)

# patients = list(collection2.find())
# for patient in patients:
#     print("Patient:", patient['_id'])
#     print("Gender preference:", patient['gender preference']['Gender'])
#     print("Importance of gender preference:", patient['gender preference']['Importance'])


client.close()

