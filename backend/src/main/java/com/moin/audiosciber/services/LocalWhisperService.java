package com.moin.audiosciber.services;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClient;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class LocalWhisperService {

  private final RestClient restClient;

  public LocalWhisperService() {
    this.restClient = RestClient.builder()
      .baseUrl("http://127.0.0.1:5000")
      .build();
  }

  public String transcribe(MultipartFile file) throws IOException {

    ByteArrayResource resource = new ByteArrayResource(file.getBytes()) {
      @Override
      public String getFilename() {
        return file.getOriginalFilename();
      }
    };

    MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
    body.add("file", resource);

    return restClient.post()
      .uri("/transcribe")
      .contentType(MediaType.MULTIPART_FORM_DATA)
      .body(body)
      .retrieve()
      .body(String.class);
  }
}
