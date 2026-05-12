def parse_lexer_output(raw_output: str) -> dict:
    """
    Parses the raw stdout/output.txt from lexer.exe into structured data.

    Input example:
        TOKEN_TYPE           VALUE
        -------------------- ------------------------------
        PRINT                📢
        STRING               "Hello World"
        ERROR                Unknown token: @

    Returns:
        {
            "tokens": [
                { "type": "PRINT",  "value": "📢" },
                { "type": "STRING", "value": '"Hello World"' },
            ],
            "errors": [
                { "type": "ERROR",  "value": "Unknown token: @" }
            ],
            "stats": {
                "total": 3,
                "PRINT": 1,
                "STRING": 1,
                "ERROR": 1,
                ...
            }
        }
    """
    tokens = []
    errors = []
    stats = {}

    lines = raw_output.strip().splitlines()

    for line in lines:
        # Skip header and separator lines
        if line.startswith("TOKEN_TYPE") or line.startswith("----"):
            continue

        # Split into at most 2 parts: token_type and value
        parts = line.split(None, 1)
        if len(parts) < 2:
            continue

        token_type = parts[0].strip()
        value = parts[1].strip()

        entry = {"type": token_type, "value": value}

        if token_type == "ERROR":
            errors.append(entry)
        else:
            tokens.append(entry)

        # Tally stats for every token including errors
        stats[token_type] = stats.get(token_type, 0) + 1

    stats["total"] = len(tokens) + len(errors)

    return {
        "tokens": tokens,
        "errors": errors,
        "stats": stats
    }