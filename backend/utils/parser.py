def parse_lexer_output(raw_output: str) -> dict:
    tokens = []
    errors = []
    stats = {}

    lines = raw_output.strip().splitlines()

    for line in lines:
        if line.startswith("TOKEN_TYPE") or line.startswith("---"):
            continue

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

        stats[token_type] = stats.get(token_type, 0) + 1

    stats["total"] = len(tokens) + len(errors)

    return {
        "tokens": tokens,
        "errors": errors,
        "stats": stats
    }
