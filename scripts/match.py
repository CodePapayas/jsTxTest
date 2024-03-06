import sqlite3

conn = sqlite3.connect('./test_db_3_24.sqlite3')

cursor = conn.cursor()

query = "SELECT * FROM ProviderAnswers ORDER BY id"
cursor.execute(query)

latest_record = cursor.fetchall()
print(latest_record)

conn.close()