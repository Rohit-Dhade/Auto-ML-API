from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LinearRegression , LogisticRegression
from sklearn.svm import SVC

classification_algorithms = [LogisticRegression(), SVC(probability=True),RandomForestClassifier(random_state=42)]

for classifier in classification_algorithms:
    print(type(classifier))