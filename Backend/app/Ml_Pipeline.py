import json , hashlib ,os , joblib
from datetime import date
from fastapi import HTTPException
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler , OneHotEncoder , LabelEncoder
from sklearn.compose import ColumnTransformer
from sklearn.ensemble import RandomForestClassifier ,RandomForestRegressor
from sklearn.linear_model import LinearRegression , LogisticRegression
from sklearn.svm import SVC , SVR
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
        os.makedirs(filepath , exist_ok=True)
        config["model_id"] = str(model_id)

        X = dataFrame.drop(target , axis=1)
        y = dataFrame[target]

        label = LabelEncoder()
        y_encoded = label.fit_transform(y)

        lable_mapping = {
            str(i) : str(label)
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
        
        classification_algorithms = [LogisticRegression(max_iter=1000, solver="lbfgs",n_jobs=-1), SVC(kernel="rbf" ,gamma="scale",probability=True),RandomForestClassifier(n_estimators=300 , min_samples_split=5 , min_samples_leaf=2 , max_features="sqrt",n_jobs=-1,random_state=42)]

        model_results = []
        
        for classifier in classification_algorithms:
            model_pipeline = Pipeline(steps=[
                ('preprocessor' , preprocessor),
                ('classification' , classifier)
            ])
            model_pipeline.fit(X_train , y_train)
            y_pred = model_pipeline.predict(X_test)
            model_results.append({
                "model_name":classifier.__class__.__name__,
                "model":model_pipeline,
                "Accuracy":model_pipeline.score(X_test , y_test),
                "F1_score":f1_score(y_test , y_pred , average='weighted'),
                "Precision": float(precision_score(y_test , y_pred , average='weighted')),
                "Recall":float(recall_score(y_test , y_pred , average='weighted'))
            })
            
        best_mode_info = max(model_results , key=lambda x : x["F1_score"])
        best_model = best_mode_info["model"]
        
        y_pred_best = best_model.predict(X_test)
        
        final_metrics = {
            "Accuracy":float(accuracy_score(y_test , y_pred_best)),
            "Precision": float(precision_score(y_test , y_pred_best , average='weighted')),
            "Recall":float(recall_score(y_test , y_pred_best , average='weighted')),
            "F1_score":float(f1_score(y_test , y_pred_best , average='weighted'))
        }

        config["Algorithm"] = best_mode_info["model_name"]
        config["labels"] = lable_mapping
        
        logs_data = {
            "model_id": str(model_id),
            "Problem_type": "classification",
            "dataset_used": str(fn),
            "target_col": str(target),
            "created_at": str(date.today()),
            "labels":lable_mapping
        }
        
        
        try:
            with open(f"{filepath}/model.pkl" , 'wb') as file:
                joblib.dump(best_model , file)
                
            with open(f"{filepath}/meta_data.json" , 'w' , encoding='utf-8') as json_file:
                json.dump(config , json_file ,indent=4 , ensure_ascii=False)
                
            write_json(logs_data)

        except Exception: 
            raise HTTPException(status_code=500 , detail="Some error in saving pkl file or json meta-data")

        return {
            "model_id":model_id,
            "problem_type":"classification",
            "best_model":best_mode_info["model_name"],
            **final_metrics,
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
        os.makedirs(filepath ,exist_ok=True)
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
        model_results = []
        regression_models = [LinearRegression(n_jobs=-1) , RandomForestRegressor(n_estimators=300,min_samples_split=5,min_samples_leaf=2,random_state=42,n_jobs=-1) , SVR(kernel="rbf", C=10, epsilon=0.1)]

        for regressor in regression_models:
            model_pipeline = Pipeline(steps=[
                ('preprocessor' , preprocessor),
                ('regression' , regressor)
            ])
            
            model_pipeline.fit(X_train , y_train)
            y_pred = model_pipeline.predict(X_test)
            
            model_results.append({
                "model_name":regressor.__class__.__name__,
                "model":model_pipeline,
                "Mean squared error": mean_squared_error(y_test , y_pred),
                "Mean absolute error": mean_absolute_error(y_test , y_pred),
                "r2_score":r2_score(y_test , y_pred)
            })
            
        best_model_info = max(model_results , key=lambda x : x["Mean squared error"])
        best_model = best_model_info["model"]
        
        y_pred_best = best_model.predict(X_test)

        final_metrics = {
            "Mean_squared_error": mean_squared_error(y_test , y_pred_best),
            "Mean_absolute_error": mean_absolute_error(y_test , y_pred_best),
            "r2_score":r2_score(y_test , y_pred_best)
        }
        
        config["Algorithm"] = best_model_info["model_name"]
        
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
            "model_id":model_id,
            "problem_type":"regression",
            "best_model":best_model_info["model_name"],
            **final_metrics,
        }