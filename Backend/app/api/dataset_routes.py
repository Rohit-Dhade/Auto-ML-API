import pandas as pd
import joblib , json
from fastapi import HTTPException
from app.api.pydantic_models import DataForRegression

lists = [{"rohit":1} , {"sujal":2}]

def regression_prediction(filepath , info_predict , filepath_meta_data):
    
    with open(filepath_meta_data , 'r') as f:
        file_data = json.load(f)
        no_of_features  = len(file_data["Categorical features"]) + len(file_data["Numerical features"])
        no_of_features_input = len(info_predict)
        
    try:
        if(no_of_features == no_of_features_input):
            pass
    except Exception:
        raise HTTPException(status_code=400 , detail="Inputs miss match with required inputs")
    
        
    if type(info_predict) == dict:
        df = pd.DataFrame([info_predict])
        try:
            with open(filepath, 'rb') as file:
                load_model = joblib.load(file)
                prediction = load_model.predict(df)
                return {"prediction" : float(prediction[0])}
            
        except Exception as e:
            raise HTTPException(status_code=500 , detail=str(e))
        
    elif type(info_predict) == list:
        predictions = []
        try:
            with open(filepath, 'rb') as file:
                load_model = joblib.load(file)
                for batch in info_predict:
                    df = pd.DataFrame([batch])
                    prediction = load_model.predict(df)
                    predictions.append(float(prediction[0]))
                    
        except Exception as e:
            raise HTTPException(status_code=500 , detail=str(e))
            
        return {"predictions" : predictions}
    
def classification_prediction(filepath , info_predict_2 , filepath_meta_data):
    
    with open(filepath_meta_data , 'r') as f:
        file_data = json.load(f)
        no_of_features  = len(file_data["Categorical features"]) + len(file_data["Numerical features"])
        no_of_features_input = len(info_predict_2)
        
    try:
        if(no_of_features == no_of_features_input):
            pass
    except Exception:
        raise HTTPException(status_code=400 , detail="Inputs miss match with required inputs")
     
    df = pd.DataFrame([info_predict_2])
    
    try:
        with open(filepath, 'rb') as file:
            load_model = joblib.load(file)
            prediction = load_model.predict(df)
            prediction_proba = load_model.predict_proba(df)
            with open(filepath_meta_data , 'r') as f:
                json_data = json.load(f)
                labels = json_data["labels"]
                return {"prediction" : labels[str(prediction[0])] , "confidence score": prediction_proba.max()}
            
    except Exception as e:
        raise HTTPException(status_code=500 , detail=str(e))
        
    