package com.moin.audiosciber.services;

import com.openai.models.audio.AudioResponseFormat;
import org.springframework.ai.audio.transcription.AudioTranscriptionPrompt;
import org.springframework.ai.audio.transcription.AudioTranscriptionResponse;
import org.springframework.ai.openai.OpenAiAudioTranscriptionModel;
import org.springframework.ai.openai.OpenAiAudioTranscriptionOptions;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.Duration;

@Service
public class OpenAiTranscriptionService implements TranscriptionProvider {

  private final OpenAiAudioTranscriptionModel transcriptionModel;

  public OpenAiTranscriptionService(
    OpenAiAudioTranscriptionModel transcriptionModel
  ){
    this.transcriptionModel = transcriptionModel;
  }

  @Override
  public String transcribe(MultipartFile file) throws IOException {
    ByteArrayResource audioFile = new ByteArrayResource(file.getBytes()){
      @Override
      public String getFilename() {
        return file.getOriginalFilename();
      }
    };

    OpenAiAudioTranscriptionOptions options =
      OpenAiAudioTranscriptionOptions.builder()
        .responseFormat(AudioResponseFormat.TEXT)
        .language("en")
        .timeout(Duration.ofSeconds(1))
        .maxRetries(0)
        .temperature(0f)
        .build();

    AudioTranscriptionPrompt prompt =
      new AudioTranscriptionPrompt(audioFile, options);

    AudioTranscriptionResponse response=
      transcriptionModel.call(prompt);

    return response.getResult().getOutput();
  }
}
