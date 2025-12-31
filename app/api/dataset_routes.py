from fastapi import FastAPI , File , UploadFile
from typing import Annotated

app = FastAPI()

@app.get('/')
def root():
    return {'msg':"hello world from fastAPI"}

@app.post('/uploadfile/')
async def create_upload_file(file : UploadFile):
    return {"filename":file.filename}