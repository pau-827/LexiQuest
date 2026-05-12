import subprocess
import os
from utils.parser import parse_lexer_output

LEXER_DIR = os.path.join(os.path.dirname(__file__), '..', 'lexer')
LEXER_EXE = os.path.join(LEXER_DIR, 'lexer.exe')
INPUT_FILE = os.path.join(LEXER_DIR, 'input.txt')


def run_lexer(source_code: str) -> dict:
    # 1. Write input.txt as UTF-8 explicitly
    with open(INPUT_FILE, 'w', encoding='utf-8') as f:
        f.write(source_code)

    # 2. Run lexer.exe feeding the file as raw bytes (no encoding translation)
    try:
        with open(INPUT_FILE, 'rb') as stdin_file:
            result = subprocess.run(
                [LEXER_EXE],
                stdin=stdin_file,
                capture_output=True,
                timeout=10,
                cwd=LEXER_DIR
            )
    except FileNotFoundError:
        return {
            "tokens": [],
            "errors": [{"type": "ERROR", "value": "lexer.exe not found. Did you run flex + gcc?"}],
            "stats": {"total": 0}
        }
    except subprocess.TimeoutExpired:
        return {
            "tokens": [],
            "errors": [{"type": "ERROR", "value": "Lexer timed out."}],
            "stats": {"total": 0}
        }

    # 3. Decode stdout as UTF-8
    raw_output = result.stdout.decode('utf-8', errors='replace')
    return parse_lexer_output(raw_output)