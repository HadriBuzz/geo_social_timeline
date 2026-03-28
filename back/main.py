import json
from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn


BASE_DIR = Path(__file__).resolve().parent
MOCK_DATA_PATH = BASE_DIR / "mock_data" / "init_mock_data.json"


def load_mock_data() -> dict:
    with MOCK_DATA_PATH.open("r", encoding="utf-8") as file:
        return json.load(file)


DATA = load_mock_data()

app = FastAPI(title="Geo Social Timeline API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/data")
def get_data() -> dict:
    return DATA


if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
