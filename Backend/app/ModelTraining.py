import pandas as pd
import numpy as np
from app.dataset import InvalidDatasetError
from fastapi import HTTPException
from app.Ml_Pipeline import model_response_classification , model_response_regression

def detect_date_columns(df):
    date_cols = []
    for col in df.columns:
        if df[col].dtype == "object":
            try:
                pd.to_datetime(df[col] , errors='raise')
                df.drop(columns=[col] , inplace=True)
            except:
                pass
    
    return df

# def transform_date_cols(df , col):
#     df[col] = pd.to_datetime(df[col] , errors='coerce')
    
#     df[f'{col}_year'] = df[col].dt.year
#     df[f'{col}_month'] = df[col].dt.month
#     df[f'{col}_day'] = df[col].dt.day
#     df[f'{col}_daysofWeek'] = df[col].dt.dayofweek
    
#     df.drop(columns=[col] , inplace=True)
#     return df

# def final_preprocessing_datetime(df):
#     date_cols = detect_date_columns(df)
    
#     for col in date_cols:
#         df = transform_date_cols(df , col)
        
#     return df


def modelTrainingfunc(requireds: dict):
    
    filename = requireds['filename']

    try:
        d = pd.read_csv(f"storage/datasets/{filename}")
        df = detect_date_columns(d)
        cat_columns = []
        numerical_columns = []
        target_col = requireds["target_column"]

        for col in list(df.columns):
            if col == target_col:
                continue

            if str(df[col].dtype) == "object":
                cat_columns.append(col)

            else:
                numerical_columns.append(col)
                
        # print(numerical_columns , cat_columns)
        
    except InvalidDatasetError as e:
        raise HTTPException(status_code=400, detail=str(e))

    if requireds["problem_type"] == "classification":

        classification_response = model_response_classification(
            df, cat_columns, numerical_columns, target_col ,filename
        )
        return classification_response

    elif requireds["problem_type"] == "regression":
        regression_response = model_response_regression(df , cat_columns , numerical_columns , target_col ,filename)
        return regression_response

    else:
        return {
            "msg": "No proper problem type. Please select between regression and classification"
        }
