from flask import Flask, request, jsonify
from faster_whisper import WhisperModel
import tempfile
import os

app = Flask(__name__)

model = WhisperModel(
    "base",
    device="cuda",
    compute_type="float16"
)


@app.post("/transcribe")
def transcribe():
    if "file" not in request.files:
        return jsonify({"error": "No audio file provided"}), 400

    file = request.files["file"]

    if file.filename == "":
        return jsonify({"error": "No audio file selected"}), 400

    temp_path = None

    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=".audio") as temp:
            file.save(temp.name)
            temp_path = temp.name

        segments, info = model.transcribe(
            temp_path,
            beam_size=5
        )

        text = " ".join(segment.text.strip() for segment in segments)

        return jsonify({
            "text": text,
            "language": info.language
        })

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500

    finally:
        if temp_path and os.path.exists(temp_path):
            os.remove(temp_path)


if __name__ == "__main__":
    app.run(
        host="127.0.0.1",
        port=5000
    )