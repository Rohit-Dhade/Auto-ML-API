import json , hashlib ,os , joblib
from datetime import date
from fastapi import HTTPException
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler , OneHotEncoder , LabelEncoder
from sklearn.compose import ColumnTransformer
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score , recall_score , precision_score , f1_score , mean_squared_error ,mean_absolute_error , r2_score

def generate_model_id(config: dict) -> str:
    config_str = json.dumps(config , sort_keys=True)
    return hashlib.md5(config_str.encode()).hexdigest()
    
def write_json(data , filename = "storage/models/logs.json"):
    with open(filename , 'r+') as file:
        file_data = json.load(file)
        file_data.append(data)
        file.seek(0)
        json.dump(file_data , file , indent=4 , ensure_ascii=False)

def model_response_classification(dataFrame,  categorical_features , numerical_features , target ,fn):
    
        config = {
            "Dataset name": fn,
            "Target column":target,
            "Problem type":"classification",
            "Categorical features":categorical_features,
            "Numerical features": numerical_features,
            "Algorithm":"RandomForestClassifier"
        }
        
        model_id = generate_model_id(config)
        filepath = f"storage/models/{model_id}"
        
        if os.path.exists(filepath):
            return {
                "Message":"Model already exists",
                "model Id" : model_id
            }
        os.makedirs(filepath)

        X = dataFrame.drop(target , axis=1)
        y = dataFrame[target]

        label = LabelEncoder()
        y_encoded = label.fit_transform(y)

        lable_mapping = {
            int(i) : str(label)
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
        
        logs_data = {
            "model_id": str(model_id),
            "Problem_type": "classification",
            "dataset_used": str(fn),
            "target_col": str(target),
            "created_at": str(date.today())
        }
        
        try:
            with open(f"{filepath}/model.pkl" , 'wb') as file:
                joblib.dump(model_pipeline , file)
                
            with open(f"{filepath}/meta_data.json" , 'w' , encoding='utf-8') as json_file:
                json.dump(config , json_file ,indent=4 , ensure_ascii=False)
                
            write_json(logs_data)

        except Exception: 
            raise HTTPException(status_code=500 , detail="Some error in saving pkl file or json meta-data")

        return {
            "model":"RandomForestClassifier",
            "Accuracy score":float(accuracy),
            "Precision":float(precision),
            "Recall": float(recall),
            "F1_score": float(f1),
            "labels":lable_mapping
        }
        
        
def model_response_regression(dataframe , categorical_features , numerical_features , target ,fn):
        
        config = {
            "Dataset name": fn,
            "Target column":target,
            "Problem type":"regression",
            "Categorical features":categorical_features,
            "Numerical features": numerical_features,
            "Algorithm":"LinearRegression"
        }
        
        model_id = generate_model_id(config)
        filepath = f"storage/models/{model_id}"
        
        if os.path.exists(filepath):
            return {
                "Message":"Model already exists",
                "model Id" : model_id
            }
        os.makedirs(filepath)
        config["model_id"] = str(model_id)
        
        X = dataframe.drop(target , axis=1)
        y = dataframe[target]
        y_clean = dataframe[target].fillna(dataframe[target].mean())

        X_train , X_test , y_train , y_test = train_test_split(X , y_clean , test_size=0.2 , random_state=42)

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
            ('regression' , LinearRegression())
        ])

        model_pipeline.fit(X_train , y_train)
        y_pred = model_pipeline.predict(X_test)
        
        rmse = mean_squared_error(y_test , y_pred)
        mae = mean_absolute_error(y_test , y_pred)
        R2score = r2_score(y_test , y_pred)
        
        logs_data = {
            "model_id": str(model_id),
            "Problem_type": "regression",
            "dataset_used": str(fn),
            "target_col": str(target),
            "created_at": str(date.today())
        }
        
        
        try:
            with open(f"{filepath}/model.pkl" , 'wb') as file:
                joblib.dump(model_pipeline , file)
                
            with open(f"{filepath}/meta_data.json" , 'w' , encoding='utf-8') as json_file:
                json.dump(config , json_file ,indent=4 , ensure_ascii=False)
                
            write_json(logs_data)
                

        except Exception: 
            raise HTTPException(status_code=500 , detail="Some error in saving pkl file or json meta-data")
            
        
        return {
            "model":"LinearRegressor",
            "Root mean square error": float(rmse),
            "Mean absolute error": float(mae),
            "R2 score": float(R2score)
        }