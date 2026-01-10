## Auto-ML Platform

The Auto-ML Platform is a full-stack project that automates the machine learning workflow and provides a clean dashboard to interact with models.
Users can upload datasets, train models, view metadata, and manage ML experiments through a simple web interface powered by REST APIs.

## Overview

Machine learning workflows often require repetitive manual steps.
The Auto-ML Platform abstracts this complexity by offering APIs and a dashboard that automate training pipelines and expose model insights through a clean interface.

The platform supports experimentation, learning, and extension into enterprise-grade ML systems.

## System Architecture

```
Client (React Dashboard)
        |
        |  HTTP / REST
        v
Backend (FastAPI)
        |
        |  ML Pipeline + Metadata
        v
Storage (JSON / Filesystem (logs.json file))

```

## Tech Stack

### Backend

- FastAPI

- Python

- RESTful APIs

- JSON-based metadata storage

### Frontend

- React

- Vite

- Axios

- Tailwind CSS

## Features

- Dataset upload and validation

- Automated model training pipeline

- Model metadata storage and retrieval

- REST API interface for ML operations

- Interactive frontend dashboard

- Scalable and modular codebase

## System Architecture

```
Auto-ML-Platform/
│
├── backend/
│   ├── app/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── models/
|   |── dataset.py
│   |── main.py
│   ├── logs.json
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── api/axios.js
│   │   ├── assets
│   │   └── App.jsx
│   ├── index.html
│   └── package.json
│
└── README.md
```

## Backend Setup

### Prerequisites
- python 3.9+
- pip

### Installation
```
cd Backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```
### Running Backend:

```
http://127.0.0.1:8000
```
### Swagger API documentation:
```
http://127.0.0.1:8000/docs
```

## Frontend Setup

### Prerequisites
- Node.js 18+
- npm

### Installation
```
cd Frontend/auto-ml
npm install
```
### Running Frontend:

```
npm run dev
```
### Frontend Application:
```
http://localhost:5173
```

## API Documentation

### Upload Dataset
```
POST / uploadfile
```
### Request
```
FormData:
file: dataset.csv
```
### Response

```
{
  "detail": "File uploaded successfully",
  "dataset": {
    "filename": "dataset.csv",
    "rows": 500,
    "columns": 10
  }
}
```
## Train Model
```
POST /train
```
### Request

```
{
  "dataset_id": "dataset_01",
  "target_column": "price"
}
```
## Get Model Metadata

```
GET /ShowMetaData?model_id=model_123
```

### Response

```
 {
    "model_id": "1b4a2b74f226ced8a681975e01cf289a",
    "Problem_type": "regression",
    "dataset_used": "winequality.csv",
    "target_col": "quality",
    "created_at": "2026-01-10"
}
```
## Delete Model

```
DELETE /deleteModel?model_id=model_123
```
### Response

```
{
  "detail": "Model deleted successfully"
}
```
### and many more endpoints

## Frontend Functionality

- Responsive dashboard layout

- Dataset upload form

- Lists Datasets

- Delete Datasets

- Train ML Models

- Show meta Data

- Show Prediction

- Delete Model

- API-driven state management


## Security and CORS

CORS middleware is configured in the backend to allow controlled access from the frontend during development.

Example:  Allowed origins: http://localhost:5173

Credentials enabled

## Future Roadmap

- Model versioning and comparison

- User authentication and roles

- Background training jobs

- Cloud deployment (Docker, AWS)

- All HTTP methods supported

## Author

### Rohit Dhade



