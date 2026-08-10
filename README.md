# AudioScribe

AudioScribe is a full stack application that turns spoken audio into written text using OpenAI Whisper. The application uses a Spring Boot backend to handle audio processing and transcription, with a React frontend for interacting with the service.

## Overview

The application allows users to upload an audio file and receive its transcription through a simple web interface.

The backend handles the transcription workflow through Spring AI and communicates with OpenAI's Whisper model. The frontend provides the interface for submitting audio and viewing the resulting transcript.

## Tech Stack

### Backend

Spring Boot

Spring AI

OpenAI Whisper

Maven

### Frontend

React

Vite

## Features

Audio file upload

AI powered speech transcription

Transcript display through the web interface

Backend API for handling transcription requests

Simple frontend for interacting with the transcription service

## Project Structure

```text
AudioScribe
│
├── backend
│   ├── src
│   ├── pom.xml
│   └── ...
│
└── frontend
    ├── src
    ├── package.json
    └── ...
```

## Getting Started

### Prerequisites

Make sure the following are installed on your system.

Java

Maven

Node.js

npm

An OpenAI API key

### Backend

Navigate to the backend directory and configure your OpenAI API key in the application configuration.

Start the Spring Boot application using Maven.

```bash
mvn spring-boot:run
```

### Frontend

Navigate to the frontend directory and install the required dependencies.

```bash
npm install
```

Start the Vite development server.

```bash
npm run dev
```

Once both applications are running, open the frontend in your browser and upload an audio file to generate its transcript.

## Future Improvements

Support for additional audio formats

Transcript export as TXT or PDF

User authentication and account management

Improved transcript formatting

Speaker identification

## License

This project is for educational and development purposes.
