package com.moin.audiosciber.services;

import com.openai.errors.RateLimitException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class TranscriptionService {

  private final OpenAiTranscriptionService openAiTranscriptionService;
  private final LocalWhisperService localWhisperService;

  private boolean openAiAvailable = true;
  private long openAiDisabledUntil = 0;

  private static final long COOLDOWN_MS = 10 * 60 * 1000;

  public TranscriptionService(
    OpenAiTranscriptionService openAiTranscriptionService,
    LocalWhisperService localWhisperService
  ) {
    this.openAiTranscriptionService = openAiTranscriptionService;
    this.localWhisperService = localWhisperService;
  }

  public String transcribe(MultipartFile file) throws IOException {

    long now = System.currentTimeMillis();

    if (!openAiAvailable && now < openAiDisabledUntil) {
      return localWhisperService.transcribe(file);
    }

    if (!openAiAvailable) {
      openAiAvailable = true;
      openAiDisabledUntil = 0;
    }

    try {
      return openAiTranscriptionService.transcribe(file);

    } catch (RateLimitException e) {

      openAiAvailable = false;
      openAiDisabledUntil =
        System.currentTimeMillis() + COOLDOWN_MS;

      return localWhisperService.transcribe(file);

    } catch (Exception e) {

      return localWhisperService.transcribe(file);
    }
  }
}
