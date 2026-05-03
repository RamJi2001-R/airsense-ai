import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error
import joblib
import os

# Generate synthetic training data
np.random.seed(42)
n_samples = 5000

data = {
    'pm25': np.random.uniform(0, 300, n_samples),
    'pm10': np.random.uniform(0, 400, n_samples),
    'no2': np.random.uniform(0, 200, n_samples),
    'so2': np.random.uniform(0, 100, n_samples),
    'co': np.random.uniform(0, 50, n_samples),
    'temperature': np.random.uniform(-10, 45, n_samples),
    'humidity': np.random.uniform(10, 100, n_samples),
    'hour': np.random.randint(0, 24, n_samples),
}

df = pd.DataFrame(data)

# AQI formula (simplified)
df['aqi'] = (
    df['pm25'] * 0.4 +
    df['pm10'] * 0.2 +
    df['no2'] * 0.15 +
    df['so2'] * 0.1 +
    df['co'] * 0.1 +
    np.random.uniform(-10, 10, n_samples)
).clip(0, 500)

# Features and target
X = df[['pm25', 'pm10', 'no2', 'so2', 'co', 'temperature', 'humidity', 'hour']]
y = df['aqi']

# Train test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Train model
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Evaluate
y_pred = model.predict(X_test)
mae = mean_absolute_error(y_test, y_pred)
print(f"✅ Model trained! MAE: {mae:.2f}")

# Save model
os.makedirs('model', exist_ok=True)
joblib.dump(model, 'model/aqi_model.pkl')
print("✅ Model saved to model/aqi_model.pkl")