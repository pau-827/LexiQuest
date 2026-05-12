from flask import Flask, request, jsonify
from flask_cors import CORS
from routes.analyze import analyze_bp

app = Flask(__name__)
CORS(app)

app.register_blueprint(analyze_bp, url_prefix='/api')


@app.route('/')
def index():
    return {"message": "LexiQuest API is running 🎵"}, 200


@app.route('/debug', methods=['POST'])
def debug():
    data = request.get_json()
    code = data.get('code', '')
    bytes_received = [hex(b) for b in code.encode('utf-8')]
    return jsonify({"received": code, "bytes": bytes_received})


if __name__ == '__main__':
    app.run(debug=True, port=5000)