from pydantic import BaseModel ,Field
from typing import Annotated , Literal

class TrainingEssentials(BaseModel):
    filename: Annotated[str , Field(... , description="Enter the file name correct and exact")]
    target_column: Annotated[str , Field(... , description="Enter the target Column")]
    problem_type : Literal['regression' , 'classification']
    model : Literal["random_forest_regressor" , "linear_regressor" , "random_forest_classifier" , "logistic_regressor"]

class RequiredForPrediction(BaseModel):
    model_id : Annotated[str , Field(... , description="Enter the exact the model id")]
    data : Annotated[dict | list[dict] , Field(..., description="Enter the valid data")]
    
    
class DataForRegression(BaseModel):
    TV : Annotated[int , Field(... , description="Enter the TV value")]
    Radio :  Annotated[float , Field(..., description="Enter the radio value")]
    Social_Media : Annotated[float , Field(..., description="Enter the value")]
    Influencer : Literal["Micro" , "Mega" , "Nano"]