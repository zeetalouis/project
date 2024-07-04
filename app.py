from flask import Flask, request, jsonify, render_template

app = Flask(__name__, static_url_path='/static', static_folder='templates')

# Emotion analysis function (dummy example)
def analyze_emotion(message):
    # Replace with your actual emotion recognition logic
    if "happy" in message:
        return "Happy"
    elif "sad" in message:
        return "Sad"
    else:
        return "Neutral"

# Route for rendering the main HTML page
@app.route('/')
def index():
    return render_template('index.html')

# Route for emotion analysis
@app.route('/analyze-emotion', methods=['POST'])
def get_emotion():
    data = request.get_json()
    message = data['message']

    # Perform emotion analysis
    emotion = analyze_emotion(message)

    # Return JSON response
    return jsonify({'emotion': emotion})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
