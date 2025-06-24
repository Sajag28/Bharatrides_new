import json
import pandas as pd
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LinearRegression


df = pd.read_csv("indian_car_database_1m_full.csv")


features = [
    "make", "model", "year", "engine_cc", "city_mpg", "highway_mpg",
    "transmission", "drivetrain", "fuel_type", "body_style", "seating_capacity"
]
target = "price"

categorical = ["make", "model", "transmission", "drivetrain", "fuel_type", "body_style"]
preprocessor = ColumnTransformer(
    transformers=[("cat", OneHotEncoder(handle_unknown="ignore"), categorical)],
    remainder="passthrough"
)


pipeline = Pipeline([
    ("preprocessor", preprocessor),
    ("regressor", LinearRegression())
])


X = df[features]
y = df[target]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
pipeline.fit(X_train, y_train)


@csrf_exempt
def recommend_cars_api(request):
    if request.method != "POST":
        return JsonResponse({"error": "Only POST requests are allowed."}, status=405)

    try:
        data = json.loads(request.body)

        filtered = df[
            (df["transmission"] == data["transmission"]) &
            (df["fuel_type"] == data["fuel_type"]) &
            (df["drivetrain"] == data["drivetrain"]) &
            (df["body_style"] == data["body_style"]) &
            (df["city_mpg"] >= data["min_city_mpg"]) &
            (df["highway_mpg"] >= data["min_highway_mpg"]) &
            (df["engine_cc"] >= data["min_engine_cc"]) &
            (df["engine_cc"] <= data["max_engine_cc"])
        ].copy()

        if filtered.empty:
            return JsonResponse({"message": " No cars matched your preferences."}, status=404)

        X_filtered = filtered[features]
        filtered["predicted_price"] = pipeline.predict(X_filtered)

        filtered = filtered[
            (filtered["predicted_price"] >= data["min_price"]) &
            (filtered["predicted_price"] <= data["max_price"])
        ].copy()

        if filtered.empty:
            return JsonResponse({"message": " No cars matched your price range."}, status=404)

        filtered["price_diff"] = abs(filtered["predicted_price"] - filtered["price"])
        result = filtered.sort_values("price_diff").head(data.get("top_n", 10))

        return JsonResponse(result[[
            "make", "model", "year", "engine_cc", "fuel_type", "transmission",
            "drivetrain", "city_mpg", "highway_mpg", "body_style",
            "seating_capacity", "price", "predicted_price"
        ]].to_dict(orient="records"), safe=False)

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)
