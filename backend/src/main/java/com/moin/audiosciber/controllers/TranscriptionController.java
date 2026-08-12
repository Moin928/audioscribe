package com.moin.audiosciber.controllers;

import com.moin.audiosciber.services.TranscriptionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/transcribe")
public class TranscriptionController {

  private final TranscriptionService transcriptionService;

  public TranscriptionController(

    TranscriptionService transcriptionService) {

    this.transcriptionService = transcriptionService;
  }


  @PostMapping
  public ResponseEntity<String> transcribeAudio(
    @RequestParam("file") MultipartFile file) throws IOException {

    String response = transcriptionService.transcribe(file);

    return new ResponseEntity<>(response, HttpStatus.OK);
  }
}
