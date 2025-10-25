from flask import Flask, render_template, request, jsonify
from deep_translator import GoogleTranslator

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/translate', methods=['POST'])
def translate_text():
    data = request.get_json()
    text = data.get('text')
    source = data.get('sourceLang')
    target = data.get('targetLang')

    if not text:
        return jsonify({'error': 'No text provided'}), 400

    try:
        translated_text = GoogleTranslator(source=source, target=target).translate(text)
        return jsonify({'translatedText': translated_text})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
