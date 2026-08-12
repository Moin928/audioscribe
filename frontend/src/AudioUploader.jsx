import { useState } from "react";
import axios from "axios"

const AudioUploader = () => {

    const [file, setFile] = useState(null);
    const [transcription, setTranscription] = useState("");
    const [isDragging, setIsDragging] = useState(false);
    const [isTranscribing, setIsTranscribing] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [progress, setProgress] = useState(0);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    }

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
};

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];

        if (droppedFile && droppedFile.type.startsWith("audio/")) {
            setFile(droppedFile);
    }
    };

    const handleUpload = async () => {
        if (!file || isTranscribing) return;

        const formData = new FormData();
        formData.append("file", file);

        const startTime = performance.now();

        setIsTranscribing(true);
        setElapsedTime(0);
        setProgress(10);

        const timer = setInterval(() => {
            const elapsed = (performance.now() - startTime) / 1000;
            setElapsedTime(elapsed);

            setProgress((current) => {
                if (current < 85) {
                    return current + 1;
                }
                return current;
            });
        }, 100);

        try {
            const response = await axios.post(
                "http://localhost:8080/api/transcribe",
                formData
            );

            setTranscription(
                typeof response.data === "string"
                    ? response.data
                    : response.data.text
            );

            setProgress(100);
        } catch (error) {
            console.error("Error transcribing audio", error);
        } finally {
            clearInterval(timer);

            const finalTime = (performance.now() - startTime) / 1000;
            setElapsedTime(finalTime);

            setProgress(100);

            setTimeout(() => {
                setIsTranscribing(false);
            }, 300);
}
        };

    return (
    <main className="app-shell">
        <section className="app-header">
            <p className="eyebrow">AUDIO TRANSCRIPTION</p>

            <h1>AudioScribe</h1>

            <p className="subtitle">
                Turn your recordings into clear, editable text.
            </p>
        </section>

        <section className="transcriber">
            <div className="upload-section">
                <div className="upload-header">
                    <h2>Transcribe audio</h2>
                    <p>
                        Upload an audio file to generate a transcript.
                    </p>
                </div>

                <div
                className={`drop-zone ${isDragging ? "dragging" : ""}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <div className="drop-zone-content">
                    <p className="drop-zone-title">
                        {file ? file.name : "Drop an audio file here"}
                    </p>

                    <p className="drop-zone-hint">
                        {file
                            ? `${(file.size / (1024 * 1024)).toFixed(2)} MB`
                            : "or choose a file from your computer"}
                    </p>

                    <label className="browse-button">
                        Browse files
                        <input
                            type="file"
                            accept="audio/*"
                            onChange={handleFileChange}
                        />
                    </label>
                    </div>
                </div>

                <button
                    className="upload-button"
                    onClick={handleUpload}
                    disabled={!file || isTranscribing}
                >
                    {isTranscribing ? "Transcribing..." : "Transcribe"}
                </button>

                {isTranscribing && (
                    <div className="transcription-status">
                        <div className="loading-bar">
                            <div
                                className="loading-bar-progress"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>

                        <p>Transcribing... {elapsedTime.toFixed(1)}s</p>
                    </div>
                )}

                {!isTranscribing && elapsedTime > 0 && transcription && (
                    <p className="response-time">
                        Responded in {elapsedTime.toFixed(1)} seconds
                    </p>
                )}
            </div>

            <div className="transcription-result">
                <div className="result-header">
                    <h2>Transcript</h2>
                </div>

                <div className="result-content">
                    {transcription ? (
                        <p>{transcription}</p>
                    ) : (
                        <p className="empty-state">
                            Your transcript will appear here.
                        </p>
                    )}
                </div>
            </div>
        </section>
    </main>
);
}

export default AudioUploader;