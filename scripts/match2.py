import pymongo
import numpy as np
from pymongo import MongoClient
import matplotlib.pyplot as plt

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
    strict_criteria = ["gender", "race", "age", "lgbt"]
    remaining_providers = all_providers[:]

    for criterion in strict_criteria:
        preference_value = patient_criteria.get(criterion)

        if preference_value is not None:  # Ensure the preference value is not null
            remaining_providers = [
                provider
                for provider in remaining_providers
                if provider.get(criterion) == preference_value
            ]

    return remaining_providers


def generate_vector_for_patient(patient_doc, provider_doc):
    symp_patient = np.array(patient_doc["sympData"])
    symp_provider = np.array(provider_doc["sympData"])

    pop_patient = np.array(patient_doc["popData"])
    pop_provider = np.array(provider_doc["popData"])

    # Calculating absolute differences for symp and pop
    abs_diff_symp = [
        abs(symp_patient[i] - symp_provider[i]) for i in range(len(symp_patient))
    ]
    abs_diff_pop = [
        abs(pop_patient[i] - pop_provider[i]) for i in range(len(pop_patient))
    ]

    print("symp_differences:", abs_diff_symp, "pop_differences:", abs_diff_pop)

    return abs_diff_symp + abs_diff_pop

for patient_data in all_patients_data:
    matched_providers = strict_filter(patient_data, providers_data)
    matches = []  # Reset matches for each patient

    print(
        f"Matched providers for patient {patient_data['firstName']} {patient_data['lastName']}:"
    )


# Create a list to store all patient names and their top matches
all_patient_matches = []

for patient_data in all_patients_data:
    matched_providers = strict_filter(patient_data, providers_data)
    matches = []  # Reset matches for each patient

    # Create a new figure for each patient
    plt.figure(figsize=(10, 6))

    plt.suptitle(f"Top 5 Matches for Patient: {patient_data['firstName']} {patient_data['lastName']}", fontsize=14)

    for provider in matched_providers:
        patient_vector = generate_vector_for_patient(patient_data, provider)

        similarity_score = sum(patient_vector) / len(patient_vector)
        matches.append({
            'provider': f"{provider['firstName']} {provider['lastName']}",
            'similarity_score': similarity_score
        })

    # Sort the matches by similarity_score in descending order (because you want the top matches)
    matches = sorted(matches, key=lambda x: x['similarity_score'], reverse=True)

    # Store the top 5 matches for this patient
    top_matches = matches[:5]

    # Extract provider names and scores for visualization
    provider_names = [match['provider'] for match in top_matches]
    scores = [match['similarity_score'] for match in top_matches]

    # Create a bar chart for this patient
    plt.barh(provider_names, scores, color='skyblue')
    plt.xlabel('Similarity Score')
    plt.title('Top 5 Matches')

    # Append patient name and their top matches to the list
    all_patient_matches.append({
        'patient_name': f"{patient_data['firstName']} {patient_data['lastName']}",
        'top_matches': top_matches
    })

# Display all patient charts
plt.show()

# If needed, you can access the data for each patient's top matches as follows:
for patient_info in all_patient_matches:
    print(f"Patient: {patient_info['patient_name']}")
    for match in patient_info['top_matches']:
        print(f"Provider: {match['provider']}, Score: {match['similarity_score']:.2f}")
    print("------")

