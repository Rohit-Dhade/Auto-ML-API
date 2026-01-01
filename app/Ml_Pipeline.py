from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler , OneHotEncoder , LabelEncoder
from sklearn.compose import ColumnTransformer
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score , recall_score , precision_score , f1_score

def model_response_classification(dataFrame,  categorical_features , numerical_features , target):

        X = dataFrame.drop(target , axis=1)
        y = dataFrame[target]

        label = LabelEncoder()
        y_encoded = label.fit_transform(y)

        lable_mapping = {
            int(i) : label
            for i, label in enumerate(label.classes_)
        }

        X_train , X_test , y_train , y_test = train_test_split(X , y_encoded , test_size=0.2 , random_state=42 , stratify=y_encoded)

        numerical_transformer = Pipeline(steps=[
            ('imputer' , SimpleImputer(strategy='mean')),
            ('scaler' , StandardScaler())
        ])

        categorical_transformer = Pipeline(steps=[
            ('imputer' , SimpleImputer(strategy='most_frequent')),
            ('onehot' , OneHotEncoder(handle_unknown='ignore'))
        ])

        preprocessor = ColumnTransformer(
            transformers=[
                ('num' , numerical_transformer , numerical_features),
                ('cat' , categorical_transformer , categorical_features)
            ]
        )

        model_pipeline = Pipeline(steps=[
            ('preprocessor' , preprocessor),
            ('classification' , RandomForestClassifier(random_state=42))
        ])

        model_pipeline.fit(X_train , y_train)
        y_pred = model_pipeline.predict(X_test)
        r2_score = model_pipeline.score(X_test , y_test)
        accuracy = accuracy_score(y_test , y_pred)
        recall = recall_score(y_test , y_pred)
        precision = precision_score(y_test , y_pred)
        f1 = f1_score(y_test , y_pred)

        return {
            "model":"RandomForestClassifier",
            "Accuracy score":accuracy,
            "Precision":precision,
            "Recall": recall,
            "F1_score": f1,
            "labels":lable_mapping
        }