from flask import Flask, request, jsonify
from textblob import TextBlob

app = Flask(__name__)

@app.route('/analyze-emotion', methods=['POST'])
def analyze_emotion():
    data = request.get_json()
    message = data['message']

    # Perform sentiment analysis using TextBlob
    analysis = TextBlob(message)
    sentiment_score = analysis.sentiment.polarity

    # Determine emotion based on sentiment score
    if sentiment_score > 0.5:
        emotion = 'Happy'
    elif sentiment_score < -0.5:
        emotion = 'Sad'
    else:
        emotion = 'Neutral'

    return jsonify({'message': message, 'emotion': emotion})

if __name__ == '__main__':
    app.run(debug=True)
