import { useState } from "react";
import axios from "axios"

const AudioUploader = () => {

    const [file, setFile] = useState(null);
    const [transcription, setTranscription] = useState("");
    const [isDragging, setIsDragging] = useState(false);

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
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await axios.post(
            'http://localhost:8080/api/transcribe',
            formData
        );

        setTranscription(response.data);
    } catch (error) {
        console.error("Error transcribing audio", error);
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
                    disabled={!file}
                >
                    Transcribe
                </button>
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