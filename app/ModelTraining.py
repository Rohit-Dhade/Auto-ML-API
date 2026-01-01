import pandas as pd
import numpy as np
from app.services.dataset import InvalidDatasetError
from fastapi import HTTPException
from app.Ml_Pipeline import model_response_classification

def modelTrainingfunc(requireds : dict):
    
    if(requireds["problem_type"] == 'classification'):
        try:
            df = pd.read_csv(f"storage/datasets/{requireds['filename']}")
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

            response = model_response_classification(df , cat_columns , numerical_columns , target_col)

            # return requireds
            return response

        except InvalidDatasetError as e:
            raise HTTPException(status_code=400 , detail=str(e))

    elif (requireds["problem_type"] == 'regression'):
        pass

    else:
        return {'msg':"No proper problem type. Please select between regression and classification"}
