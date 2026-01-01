import os ,shutil
from fastapi import FastAPI , File , UploadFile ,HTTPException 
from typing import Annotated
from app.services.dataset import (DatasetCheck , InvalidDatasetError , DatasetAlreadyExists)
from pydantic import BaseModel ,Field
from app.api.pydantic_models import TrainingEssentials

dataset_service = DatasetCheck()
app = FastAPI()

upload_dir = 'storage/uploaded'
os.makedirs(upload_dir , exist_ok=True)


@app.get('/')
def root():
    return {'msg':"hello world from fastAPI"}

@app.get('/filesUploaded')
def ShowFileNames():
    return {"datasets" : dataset_service.list_Datasets()}

@app.post('/uploadfile/')
async def create_upload_file(file : UploadFile = File(...)):
    try:
        file_path = os.path.join(upload_dir , file.filename)
        with open(file_path , 'wb') as buffer:
            shutil.copyfileobj(file.file , buffer)

            summary = dataset_service.UploadDatasets(filename = file.filename , filepath= file_path)

            return {
                "message":"File uploaded Successfully",
                "dataset":summary
            }

    except InvalidDatasetError as e:
        raise HTTPException(status_code=400 , detail=str(e))
    
    except DatasetAlreadyExists as e:
        raise HTTPException(status_code=409 , detail=str(e))
    
    except Exception as e:
        raise HTTPException(status_code=500 , detail="Interal server issue")
    
@app.post('/deleteFile/{filename}')
async def deleteFile(filename : str):
    # fileDict = {"filename":filename}
    dataset_service.remove_file(filename)
    return {"message" : "Files deleted successfully"}

            
@app.post('/train')
async def train_models(item : TrainingEssentials):
    # item_dict = item.model_dump()
    return {"item":item}

    