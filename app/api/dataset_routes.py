import pandas as pd
import joblib , json
from fastapi import HTTPException
from app.api.pydantic_models import DataForRegression

def regression_prediction(filepath , info_predict):
    
    df = pd.DataFrame([info_predict])
    # print("ok till here")
    try:
        with open(filepath, 'rb') as file:
            load_model = joblib.load(file)
            prediction = load_model.predict(df)
            return {"prediction" : float(prediction[0])}
            
    except Exception as e:
        raise HTTPException(status_code=500 , detail=str(e))
    
def classification_prediction(filepath , info_predict_2 , filepath_meta_data):
     
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
        
    