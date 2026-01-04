import pytest
import pandas as pd
import joblib
import os


model_path = "./asdmodel.pkl"
assert os.path.exists(model_path), f"Model not found: {model_path}"
model = joblib.load(model_path)

categorical_cols = ['gender', 'ethnicity', 'contry_of_res', 'relation']  


def get_pred(data: dict):
    # Convert to DataFrame
    df = pd.DataFrame([data])

    # One-hot encode categorical columns
    df_encoded = pd.get_dummies(df, columns=categorical_cols)

    # Align columns with model input
    model_features = model.get_booster().feature_names if hasattr(model, "get_booster") else df_encoded.columns
    df_encoded = df_encoded.reindex(columns=model_features, fill_value=0)

    # Predict numeric
    pred_numeric = model.predict(df_encoded)[0]

    # Map to YES/NO
    pred_label = "YES" if pred_numeric == 1 else "NO"

    # Probability
    asd_prob = model.predict_proba(df_encoded)[0][1]

    return pred_label, asd_prob

TEST = [
    {'A1_Score':1,'A2_Score':1,'A3_Score':1,'A4_Score':1,'A5_Score':1,
     'A6_Score':1,'A7_Score':1,'A8_Score':1,'A9_Score':1,'A10_Score':1,
     'age':18,'gender':'m','ethnicity':'Asian','contry_of_res':'India','relation':'Self',
     'expected':'YES'},
    {'A1_Score':1,'A2_Score':1,'A3_Score':1,'A4_Score':1,'A5_Score':0,
     'A6_Score':0,'A7_Score':1,'A8_Score':1,'A9_Score':0,'A10_Score':0,
     'age':26,'gender':'f','ethnicity':'White-European','contry_of_res':'United States','relation':'Self',
     'expected':'YES'},
    {'A1_Score':0,'A2_Score':0,'A3_Score':0,'A4_Score':0,'A5_Score':0,
     'A6_Score':0,'A7_Score':0,'A8_Score':0,'A9_Score':0,'A10_Score':0,
     'age':25,'gender':'f','ethnicity':'White-European','contry_of_res':'United Kingdom','relation':'Self',
     'expected':'NO'},
    {'A1_Score':0,'A2_Score':1,'A3_Score':0,'A4_Score':0,'A5_Score':0,
     'A6_Score':0,'A7_Score':0,'A8_Score':0,'A9_Score':0,'A10_Score':0,
     'age':28,'gender':'m','ethnicity':'Asian','contry_of_res':'India','relation':'Parent',
     'expected':'NO'},
]

# ----------------- Pytest -----------------
@pytest.mark.parametrize("sample", TEST)
def test_asd_model(sample):
    pred_label, prob = get_pred({k:v for k,v in sample.items() if k!="expected"})
    print(f"Prediction: {pred_label}, ASD Probability: {prob:.2f}")

    # assert probabilities
    assert 0 <= prob <= 1
    
    if sum(sample[f"A{i}_Score"] for i in range(1,11)) == 0:
        assert pred_label == "NO"
