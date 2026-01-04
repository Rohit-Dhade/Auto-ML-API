from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LinearRegression , LogisticRegression
from sklearn.svm import SVC
import json

classification_algorithms = [LogisticRegression(), SVC(probability=True),RandomForestClassifier(random_state=42)]

# for classifier in classification_algorithms:
#     print(type(classifier))

# with open('storage/models/3e0adabe3f28bae48d078acffcef6f7e/meta_data.json' , 'r') as f:
#     file_data = json.load(f)
#     print(len(file_data["Categorical features"]))
#     print(len(file_data["Numerical features"]))

# info = {
#     "TV":16,
#     "Radio":6.56,
#     "Social Media":2.90,
#     "Influencer":"Mega"
# }

# print(len(info))


lists = [{"rohit":1} , {"sujal":2}]

for batch in lists:
    print(batch)