from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from contextlib import asynccontextmanager
import pandas as pd
import joblib
import os
import uvicorn

class ScreeningData(BaseModel):
    A1_Score: int
    A2_Score: int
    A3_Score: int
    A4_Score: int
    A5_Score: int
    A6_Score: int
    A7_Score: int
    A8_Score: int
    A9_Score: int
    A10_Score: int
    age: float
    gender: str
    ethnicity: str
    contry_of_res: str
    relation: str

categorical_cols = ["gender", "ethnicity", "contry_of_res", "relation"]
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_PATH = os.path.join(BASE_DIR, "asdmodel.pkl")

@asynccontextmanager
async def lifespan(app: FastAPI):
    if not os.path.exists(MODEL_PATH):
        raise RuntimeError(f"Model file not found at {MODEL_PATH}")
    app.state.model = joblib.load(MODEL_PATH)
    yield

app = FastAPI(
    title="ASD Screening API",
    description="API for Autism Spectrum Disorder Screening Model",
    lifespan=lifespan
)

@app.post("/predict")
def predict(data: ScreeningData):
    model = app.state.model
    if model is None:
        raise HTTPException(status_code=500, detail="Model not loaded")

    df = pd.DataFrame([data.model_dump()])
    df_encoded = pd.get_dummies(df, columns=categorical_cols)

    if hasattr(model, "get_booster"):
        model_features = model.get_booster().feature_names
    elif hasattr(model, "feature_names_in_"):
        model_features = model.feature_names_in_
    else:
        model_features = df_encoded.columns

    df_encoded = df_encoded.reindex(columns=model_features, fill_value=0)

    prediction = model.predict(df_encoded)[0]
    probability = (
        model.predict_proba(df_encoded)[0][1]
        if hasattr(model, "predict_proba")
        else None
    )

    return {
        "prediction": "YES" if prediction == 1 else "NO",
        "probability": float(probability) if probability is not None else None
    }

@app.get("/")
def root():
    return {"message": "ASD Screening API is running"}

def main():
    uvicorn.run(
        "api:app",
        host="localhost",
        port=8000,
        reload=True,
        log_level="info"
    )

if __name__ == "__main__":
    main()
