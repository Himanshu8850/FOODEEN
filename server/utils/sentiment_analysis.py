import joblib
import os

# Load the pre-trained model and vectorizer with absolute path
current_dir = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(current_dir, "sentiment_model.joblib")
vectorizer_path = os.path.join(current_dir, "vectorizer.joblib")

try:
    model = joblib.load(model_path)
    vectorizer = joblib.load(vectorizer_path)
    MODEL_LOADED = True
except FileNotFoundError:
    print("WARNING: Sentiment model files not found. Sentiment analysis will return 'Neutral'.")
    MODEL_LOADED = False

def analyze_sentiment(text):
    if not MODEL_LOADED:
        return "Neutral"
    
    # Transform the input text
    text_vectorized = vectorizer.transform([text])
    # Predict sentiment (0 = Negative, 1 = Positive)
    prediction = model.predict(text_vectorized)[0]
    sentiment = "Positive" if prediction == 1 else "Negative"
    return sentiment
