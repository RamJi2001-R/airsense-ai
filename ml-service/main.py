from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import numpy as np

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model
model = joblib.load('model/aqi_model.pkl')

class AQIInput(BaseModel):
    pm25: float
    pm10: float
    no2: float
    so2: float
    co: float
    temperature: float
    humidity: float
    hour: int

class PredictionOutput(BaseModel):
    predicted_aqi: float
    risk_level: str

def get_risk_level(aqi: float) -> str:
    if aqi <= 50: return "Good"
    if aqi <= 100: return "Moderate"
    if aqi <= 150: return "Unhealthy for Sensitive Groups"
    if aqi <= 200: return "Unhealthy"
    if aqi <= 300: return "Very Unhealthy"
    return "Hazardous"

@app.get("/")
def root():
    return {"message": "✅ AirSense ML Service is running!"}

@app.post("/predict", response_model=PredictionOutput)
def predict(data: AQIInput):
    features = np.array([[
        data.pm25, data.pm10, data.no2,
        data.so2, data.co, data.temperature,
        data.humidity, data.hour
    ]])
    predicted = model.predict(features)[0]
    predicted = round(float(predicted), 2)
    return {
        "predicted_aqi": predicted,
        "risk_level": get_risk_level(predicted)
    }

@app.get("/forecast/{current_aqi}")
def forecast(current_aqi: float):
    forecasts = []
    for hour in range(24):
        if 6 <= hour <= 10:
            trend = np.random.uniform(5, 20)
        elif 17 <= hour <= 21:
            trend = np.random.uniform(10, 25)
        elif 0 <= hour <= 5:
            trend = np.random.uniform(-20, -5)
        else:
            trend = np.random.uniform(-10, 10)

        predicted = max(0, current_aqi + trend)
        forecasts.append({
            "hour": f"{hour}:00",
            "aqi": round(predicted, 2),
            "risk_level": get_risk_level(predicted)
        })
    return {"forecast": forecasts}