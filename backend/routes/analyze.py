from flask import Blueprint, request, jsonify
from services.lexer_service import run_lexer

analyze_bp = Blueprint('analyze', __name__)


@analyze_bp.route('/analyze', methods=['POST'])
def analyze():
    data = request.get_json()

    if not data or 'code' not in data:
        return jsonify({"error": "Missing 'code' field in request body."}), 400

    source_code = data['code'].strip()

    if not source_code:
        return jsonify({"error": "Code input is empty."}), 400

    result = run_lexer(source_code)
    return jsonify(result), 200
