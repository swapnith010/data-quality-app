from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)

@app.route("/upload", methods=["POST"])
def upload_file():
    try:
        file = request.files["file"]

        if not file:
            return jsonify({"error": "No file uploaded"}), 400

        if file.filename.endswith(".csv"):
            df = pd.read_csv(file)
        else:
            return jsonify({"error": "Only CSV files allowed"}), 400

        rows = df.shape[0]
        columns = df.shape[1]
        duplicates = int(df.duplicated().sum())

        missing = df.isnull().sum().to_dict()

        errors = []

        # Missing value errors
        for col, val in missing.items():
            if val > 0:
                errors.append(f"{col} has {val} missing values")

        # Duplicate errors
        if duplicates > 0:
            errors.append(f"{duplicates} duplicate rows found")

        # ✅ TOTAL ERRORS COUNT (FIX)
        total_errors = len(errors)

        # Score
        total_issues = duplicates + sum(missing.values())
        score = max(0, 100 - total_issues)

        return jsonify({
            "rows": rows,
            "columns": columns,
            "duplicates": duplicates,
            "missing": missing,
            "errors": errors,
            "total_errors": total_errors,   # 🔥 NEW
            "score": int(score)
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)