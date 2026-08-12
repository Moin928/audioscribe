package com.moin.audiosciber.services;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface TranscriptionProvider {

  String transcribe(MultipartFile file) throws IOException;

}
