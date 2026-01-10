import os, shutil, json, joblib
import pandas as pd
import statsmodels.api as sm
from fastapi import FastAPI, File, UploadFile, HTTPException
from typing import Annotated
from app.dataset import DatasetCheck, InvalidDatasetError, DatasetAlreadyExists ,remove_model_from_logs
from pydantic import BaseModel, Field
from app.api.pydantic_models import (
    TrainingEssentials,
    RequiredForPrediction,
    DataForRegression,
)
from app.ModelTraining import modelTrainingfunc
from app.api.dataset_routes import regression_prediction, classification_prediction
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://auto-ml-api.vercel.app" , "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


dataset_service = DatasetCheck()

upload_dir = "storage/uploaded"
os.makedirs(upload_dir, exist_ok=True)


@app.get("/")
def root():
    return {
        "status": "ok",
        "service": "auto-ml-api",
        "message": "Service is running "
    }
    
@app.get('/health')
def health_check():
    return {"status" : "healthy"}


@app.get("/filesUploaded")
def ShowFileNames():
    return {"datasets": dataset_service.list_Datasets()}


@app.post("/uploadfile/")
async def create_upload_file(file: UploadFile = File(...)):
    try:
        file_path = os.path.join(upload_dir, file.filename)
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        await file.close()

        summary = dataset_service.UploadDatasets(
            filename=file.filename, filepath=file_path
        )

        return {"detail": "File uploaded Successfully", "dataset": summary}

    except InvalidDatasetError as e:
        raise HTTPException(status_code=400, detail=str(e))

    except DatasetAlreadyExists as e:
        raise HTTPException(status_code=409, detail=str(e))

    except Exception as e:
        raise HTTPException(status_code=500, detail="Interal server issue")


@app.post("/deleteFile/{filename}")
async def deleteFile(filename: str):
    # fileDict = {"filename":filename}
    return dataset_service.remove_file(filename)


@app.post("/train")
async def train_models(item: TrainingEssentials):
    item_dict = dict(item)

    ans = modelTrainingfunc(item_dict)
    return {"msg from model": ans}


@app.get("/ShowTrainedModels")
def showTrainedModels():
    dir_list = []
    path = "storage/models"
    for entry in os.listdir(path):
        full_path = os.path.join(path, entry)
        if os.path.isdir(full_path):
            dir_list.append(entry)

    models_list = []
    for model in dir_list:
        with open(f"storage/models/{model}/meta_data.json", "r") as file:
            models_list.append({f"{model}": json.load(file)})

    return models_list


@app.get("/ShowMetaData")
def show_meta_data(model_id: str):
    with open(f"storage/models/{model_id}/meta_data.json", "r") as file:
        return json.load(file)


@app.post("/predict")
def show_prediction(req_data: RequiredForPrediction):
    req_data_dict = dict(req_data)
    print("ok till here")
    filepath = f"storage/models/{req_data_dict["model_id"]}/model.pkl"
    filepath_meta_data = f"storage/models/{req_data_dict["model_id"]}/meta_data.json"
    model_id = req_data_dict["model_id"]
    with open(
        f"storage/models/{req_data_dict["model_id"]}/meta_data.json", "r"
    ) as file:
        pr = json.load(file)["Problem type"]

    print()

    if pr == "classification":
        return classification_prediction(
            filepath, req_data_dict["data"], filepath_meta_data
        )
    elif pr == "regression":
        return regression_prediction(
            filepath, req_data_dict["data"], filepath_meta_data
        )


@app.delete("/deleteModel")
def delete_model(model_id: str):
    dirPath = f"storage/models/{model_id}"
    try:
        shutil.rmtree(dirPath)
        remove_model_from_logs(model_id)
        return {"response": "Deleted Successfully"}

    except Exception:
        raise HTTPException(
            status_code=400, detail="Model with given id does not exist"
        )
    
@app.get("/logs")
def show_logs():
    with open("storage/models/logs.json", "r") as file:
        f = json.load(file)
        return f
