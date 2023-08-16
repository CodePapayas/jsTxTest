uri = "mongodb+srv://CodePapayas:Pistachios2050@cluster0.crlnuvw.mongodb.net/?retryWrites=true&w=majority"

from pymongo import MongoClient

# Connect to the MongoDB server
client = MongoClient(uri)

# Access the database and collection
db = client['AnswerObjects']
collection = db['PatientAnswers']

# Empty the collection
collection.delete_many({})

print(collection.count_documents({}))
