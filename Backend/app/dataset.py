import csv , pandas as pd , os ,shutil ,json
from typing import Dict , Any
from fastapi import HTTPException
from pathlib import Path


class DatasetError(Exception):
    pass

class InvalidDatasetError(Exception):
    pass

class DatasetAlreadyExists(Exception):
    pass

file_names_list = os.listdir('storage/datasets')

class DatasetCheck:
    def __init__(self , upload_dir: str = "storage/uploaded" , dataset_dir: str = 'storage/datasets'):
        self.upload_dir = upload_dir
        self.dataset_dir = dataset_dir

        os.makedirs(self.upload_dir, exist_ok=True)
        os.makedirs(self.dataset_dir , exist_ok=True)

    def UploadDatasets(self , filename: str , filepath: str) -> Dict[str ,Any]:
        """
        Docstring for UploadDatasets
        
        :param self: Description
        :param filename: Description
        :type filename: str
        :param filepath: Description
        :type filepath: str
        :return: Description
        :rtype: Dict[str, Any]

        """

        # Checking the file type it should always be .csv. 

        if not filename.endswith(".csv"):
            raise InvalidDatasetError("Only .csv files are allowed")

        final_path = os.path.join(self.dataset_dir, filename)

        if os.path.exists(final_path):
            raise DatasetAlreadyExists(
                f"Your file {filename} already exists. Please rename or delete it."
            )

        try:
            print(filepath)
            df = pd.read_csv(filepath)
        except Exception as e:
            raise InvalidDatasetError(f"Invalid CSV file: {e}")

        if df.shape[0] < 1:
            raise InvalidDatasetError("Dataset must have at least 1 row")

        if df.shape[1] < 2:
            raise InvalidDatasetError("Dataset must have at least 2 columns")

        warning = ""
        if df.shape[0] < 100:
            warning = "Rows < 100 may affect ML performance"

        shutil.move(filepath, final_path)

        return {
            "filename": filename,
            "no_of_columns": df.shape[1],
            "no_of_rows": df.shape[0],
            "columns": list(df.columns),
            "warning": warning
        }

        
    def list_Datasets(self):
        datasets = []
        file_names = os.listdir('storage/datasets')

        for file in file_names:
            with open(f'storage/datasets/{file}' , 'r') as f:
                df = pd.read_csv(f)
                datasets.append({
                    'filename':file,
                    'No_of_Columns': df.shape[1],
                    'No_of_rows':df.shape[0]
                })

        return datasets
        

    def remove_file(self , filename: str):
        try:
            os.remove(f'storage/datasets/{filename}')
            return {"message" : "Files deleted successfully"}
        except Exception as e:
            return {"message":"file does not exists"}
        
LOGS_PATH = Path("/data/storage/models/logs.json")

def remove_model_from_logs(model_id: str):
    if not LOGS_PATH.exists():
        LOGS_PATH.write_text("[]")
        raise HTTPException(status_code=404, detail="logs.json not found")

    with open(LOGS_PATH, "r") as f:
        logs = json.load(f)

    updated_logs = []
    removed = False

    for log in logs:
        if log.get("model_id") == model_id:
            removed = True
            continue
        updated_logs.append(log)

    if not removed:
        raise HTTPException(status_code=404, detail="Model ID not found in logs")

    temp_file = LOGS_PATH.with_suffix(".tmp")
    with open(temp_file, "w") as f:
        json.dump(updated_logs, f, indent=4)

    temp_file.replace(LOGS_PATH)

    return True