# AudioScribe

AudioScribe is an audio transcription application that converts uploaded recordings into editable text.

The application uses OpenAI for transcription when available and falls back to a local Faster Whisper model running on the user's GPU. The local transcription service is containerized with Docker and uses CUDA for GPU acceleration.

## Features

Audio file upload

Audio transcription with OpenAI Whisper

Local transcription with Faster Whisper

Automatic fallback to local transcription

GPU accelerated local inference

Dockerized Whisper service

English language transcription

Simple transcription interface

## Tech Stack

Frontend

React

JavaScript

CSS

Backend

Java

Spring Boot

Spring AI

Python

Flask

Faster Whisper

Infrastructure

Docker

NVIDIA CUDA

NVIDIA GPU

## Project Structure

    audioscribe/
    ├── backend/
    ├── frontend/
    ├── local whisper/
    └── docker compose.yml

## How It Works

The frontend sends the audio file to the Spring Boot backend.

The backend handles the transcription provider and uses OpenAI when available. Local Whisper is available as a fallback when the cloud service cannot be used.

The local Whisper service runs separately in a Docker container with NVIDIA GPU access.

## Running Locally

### Requirements

Java 17 or newer

Node.js

Python is only required if you want to run the local service outside Docker

Docker Desktop

An NVIDIA GPU with working Docker GPU support for local transcription

### Environment Variables

Create an environment variable named `API_KEY` containing your OpenAI API key.

The backend reads the key from the environment rather than storing it in the project.

### Start Local Whisper

From the project root:

    docker compose up --build

The first startup may take longer because the Whisper model needs to be initialized and downloaded.

Later requests are significantly faster once the model is loaded.

### Start the Backend

Open the backend project and run the Spring Boot application.

The backend runs on port 8080 by default.

### Start the Frontend

From the frontend directory:

    npm install
    npm run dev

Open the address shown by Vite in the terminal.

## Local Whisper

The local transcription service uses the base Faster Whisper model with CUDA and float16 computation.

Docker provides the Python environment and CUDA libraries so the local service does not depend on the Python environment installed on the host machine.

A Docker volume is used to keep the downloaded Whisper model cached between container restarts.

## Notes

The first transcription after restarting the Docker container can take considerably longer because the model and GPU environment need to initialize.

Once the model is warm, transcription is much faster.

AudioScribe is primarily a learning and portfolio project focused on building a practical transcription pipeline with both cloud and local inference.
