# AudioScribe

AudioScribe is a simple audio transcription app that turns uploaded recordings into editable text.

The frontend is built with React and the backend uses Spring Boot. Local transcription is handled by Faster Whisper through a small Flask service and runs on the GPU using CUDA. The project also includes OpenAI transcription support for cloud based transcription.

## Features

Upload audio files through the browser

Drag and drop audio files

Local transcription using Faster Whisper

GPU acceleration with CUDA

OpenAI transcription support

Loading progress while transcription is running

Shows the time taken for each transcription

Responsive interface

## Tech Stack

### Frontend

React

JavaScript

CSS

Axios

### Backend

Java

Spring Boot

Spring AI

REST API

### Local Transcription

Python

Flask

Faster Whisper

CUDA

### Cloud Transcription

OpenAI Whisper API

## How It Works

The React frontend sends the selected audio file to the Spring Boot backend.

Spring Boot handles the upload and sends the audio to the transcription provider. Local transcription is handled by the Flask service running Faster Whisper with CUDA acceleration.

The resulting transcript is returned to the frontend and displayed to the user along with the response time.

## Project Structure

    audioscribe
    ├── backend
    │   └── Spring Boot application
    │
    ├── frontend
    │   └── React application
    │
    └── local-whisper
        └── Flask Faster Whisper service

## Running the Project

### 1. Start the local Whisper service

Navigate to the local Whisper directory and activate the Python virtual environment.

Then run:

    python app.py

The service runs on:

    http://127.0.0.1:5000

The local Whisper setup requires a CUDA capable NVIDIA GPU and the required CUDA libraries.

### 2. Start the Spring Boot backend

Navigate to the backend directory and run the Spring Boot application.

The backend runs on:

    http://localhost:8080

If OpenAI transcription is being used, set your API key as an environment variable:

    API_KEY=your_api_key

The API key is not stored in the project.

### 3. Start the frontend

Navigate to the frontend directory and install the dependencies:

    npm install

Then start the development server:

    npm run dev

Open the local address shown by Vite in your browser.

## Performance

Local transcription was tested using Faster Whisper with the base model, CUDA and float16 computation.

After the model is warmed up, short audio samples can be transcribed in roughly half a second on the development machine.

The first request can take longer because the model and GPU libraries need to initialize.

## Why Local Whisper

The local transcription service makes AudioScribe usable without depending entirely on an external API. It also provides very low latency after the model has warmed up.

OpenAI support is included as a cloud transcription option when cloud based processing is preferred.

## Environment Variables

The OpenAI API key should be provided through an environment variable:

    API_KEY=your_api_key

Never commit the actual API key to the repository.

## Status

AudioScribe is currently a completed personal project focused on learning and implementing audio transcription, local AI inference, Spring Boot service architecture and frontend backend communication.
