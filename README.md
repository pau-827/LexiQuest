# 🎧 LexiQuest

> A lofi-inspired, interactive lexical analyzer for a Python subset — built with Flex, Flask, and React.

![Theme](https://img.shields.io/badge/theme-lofi%20night%20city-7b6cff?style=flat-square)
![Flex](https://img.shields.io/badge/lexer-Flex-ff6cbc?style=flat-square)
![Flask](https://img.shields.io/badge/backend-Flask-6cffb4?style=flat-square)
![React](https://img.shields.io/badge/frontend-React%20%2B%20Vite-6cefff?style=flat-square)

---

## 📖 About

LexiQuest is a web-based Programming Languages course project that combines **Flex**, **Flask**, and **React + Vite** to create an interactive lexical analyzer. It takes Python source code as input, tokenizes it using a Flex-generated lexer, and visualizes the results in a compact, lofi-styled UI.

The project demonstrates core compiler frontend concepts:

- Lexical analysis and tokenization
- Regular expression-based pattern matching
- Error detection and continued scanning
- Web-based token visualization

---

## ✨ Features

- 🔍 Lexical analysis of a Python language subset using Flex
- 🌐 Flask REST API backend
- ⚛️ React + Vite frontend
- 📊 Token visualization table with color-coded badges
- 📈 Stats panel showing total, valid, and error token counts
- ❌ Lexical error detection with continued scanning
- 🎨 Three switchable lofi themes — Night City, Coffee Shop, Bedroom Pop

---

## 🧠 Recognized Token Types

| Token Type    | Examples                                      |
|---------------|-----------------------------------------------|
| `KEYWORD`     | `if` `else` `elif` `while` `for` `def` `return` `import` `print` `and` `or` `not` `in` `is` `None` |
| `BOOLEAN`     | `True` `False`                                |
| `IDENTIFIER`  | `myVar` `count` `greet`                       |
| `INTEGER`     | `0` `42` `100`                                |
| `FLOAT`       | `3.14` `0.5`                                  |
| `STRING`      | `"hello"` `'world'`                           |
| `OPERATOR`    | `+` `-` `*` `/` `=` `==` `!=` `<` `>` `<=` `>=` `%` `+=` `-=` |
| `PUNCTUATION` | `:` `,` `.` `(` `)` `[` `]`                  |
| `COMMENT`     | `# this is a comment`                         |
| `ERROR`       | any unrecognized character                    |

---

## 🛠️ Tech Stack

| Layer    | Technology              |
|----------|-------------------------|
| Lexer    | Flex + GCC (via MSYS2)  |
| Backend  | Python, Flask, Flask-CORS |
| Frontend | React, Vite, CSS        |

---

## 📂 Project Structure

```
lexiquest/
│
├── backend/
│   ├── app.py                  # Flask entry point
│   ├── requirements.txt
│   ├── lexer/
│   │   ├── lexer.l             # Flex token rules
│   │   ├── lex.yy.c            # Flex-generated C file
│   │   ├── lexer.exe           # Compiled lexer binary
│   │   ├── input.txt           # Runtime input file
│   │   └── output.txt          # Runtime output file
│   ├── routes/
│   │   └── analyze.py          # POST /api/analyze route
│   ├── services/
│   │   └── lexer_service.py    # Runs lexer, captures output
│   └── utils/
│       └── parser.py           # Parses raw lexer output to JSON
│
└── frontend/
    ├── package.json
    ├── vite.config.js
    ├── public/
    └── src/
        ├── App.jsx
        ├── main.jsx
        ├── components/
        │   ├── Editor.jsx
        │   ├── Navbar.jsx
        │   ├── StatsCard.jsx
        │   └── TokenTable.jsx
        ├── pages/
        │   └── Analyzer.jsx
        ├── services/
        │   └── api.js
        └── styles/
            └── app.css
```

---

## 🚀 Getting Started

### Prerequisites

- Python 3.x
- Node.js + npm
- MSYS2 with Flex and GCC (Windows)

Install MSYS2 packages via the UCRT64 terminal:

```bash
pacman -S flex gcc make
```

---

### 1. Compile the Lexer

In the MSYS2 UCRT64 terminal:

```bash
cd /c/path/to/lexiquest/backend/lexer
flex lexer.l
gcc lex.yy.c -o lexer.exe
```

---

### 2. Run the Backend

```bash
cd backend
pip install flask flask-cors
python app.py
```

Flask will start at `http://localhost:5000`.

---

### 3. Run the Frontend

```bash
cd frontend
npm install
npm run dev
```

Vite will start at `http://localhost:5173`.

---

## 🔌 API Reference

### `POST /api/analyze`

Analyzes source code and returns tokenized output.

**Request body:**
```json
{
  "code": "def greet(name):\n    print(\"Hello\", name)"
}
```

**Response:**
```json
{
  "tokens": [
    { "type": "KEYWORD",     "value": "def" },
    { "type": "IDENTIFIER",  "value": "greet" },
    { "type": "PUNCTUATION", "value": "(" },
    { "type": "IDENTIFIER",  "value": "name" },
    { "type": "PUNCTUATION", "value": ")" },
    { "type": "PUNCTUATION", "value": ":" }
  ],
  "errors": [],
  "stats": {
    "KEYWORD": 1,
    "IDENTIFIER": 2,
    "PUNCTUATION": 3,
    "total": 6
  }
}
```

---

## 🎨 Themes

Switch between three lofi themes using the colored dots in the navbar:

| Theme        | Vibe                        |
|--------------|-----------------------------|
| 🟣 Night City  | Dark purple/blue neon       |
| 🟡 Coffee Shop | Warm amber, cozy café tones |
| 🩷 Bedroom Pop | Soft pink/pastel aesthetic  |

---

## 🎓 Course

Developed for **CS 3212 | Programming Languages** course.

---

## 👤 Author

**Ivy Pauline B. Muit - BSCS 3A**
