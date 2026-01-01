from pydantic import BaseModel ,Field
from typing import Annotated , Literal

class TrainingEssentials(BaseModel):
    filename: Annotated[str , Field(... , description="Enter the file name correct and exact")]
    target_column: Annotated[str , Field(... , description="Enter the target Column")]
    problem_type : Literal['regression' , 'classification']
    model : Literal["random_forest_regressor" , "linear_regressor" , "random_forest_classifier" , "logistic_regressor"]
