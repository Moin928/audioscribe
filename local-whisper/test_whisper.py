from faster_whisper import WhisperModel

model = WhisperModel(
    "base",
    device="cuda",
    compute_type="float16"
)

segments, info = model.transcribe(
    "test.mp3",
    beam_size=5
)

print(f"Detected language: {info.language}")

for segment in segments:
    print(segment.text)