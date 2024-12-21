package com.example.demosql.controller;

import org.springframework.beans.factory.annotation.Value;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;

@RestController
public class ImageController {

    @Value("${image.path}")
    private String imagePrefixPath;

    // Thư mục chứa ảnh của từng loại
    private static final String NEWS_IMAGE_DIRECTORY = "/images/news/";
    private static final String AIRPORT_IMAGE_DIRECTORY = "/images/airport/";


    @GetMapping("/images/news/{imageName}")
    public ResponseEntity<ByteArrayResource> getNewsImage(@PathVariable String imageName) throws IOException {
        return getImage(imageName, NEWS_IMAGE_DIRECTORY);
    }

    @GetMapping("/images/airport/{imageName}")
    public ResponseEntity<ByteArrayResource> getAirportImage(@PathVariable String imageName) throws IOException {
        return getImage(imageName, AIRPORT_IMAGE_DIRECTORY);
    }

    private ResponseEntity<ByteArrayResource> getImage(String imageName, String imageDirectory) throws IOException {
        // Tạo đường dẫn tuyệt đối từ imagePrefixPath và imageDirectory
        String resourcePath = imagePrefixPath + imageDirectory + imageName;

        System.out.println("imagePrefixPath: " + imagePrefixPath);

        File imgFile = new File(resourcePath);

        if (!imgFile.exists()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ByteArrayResource(("File not found: " + imageName).getBytes()));
        }

        // Đọc nội dung tệp
        try (InputStream inputStream = new FileInputStream(imgFile)) {
            byte[] imageBytes = inputStream.readAllBytes();
            ByteArrayResource resource = new ByteArrayResource(imageBytes);

            // Xác định Content-Type
            String contentType = Files.probeContentType(imgFile.toPath());
            if (contentType == null) {
                contentType = "application/octet-stream";
            }

            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.CONTENT_TYPE, contentType);

            return ResponseEntity.ok().headers(headers).body(resource);
        }
    }

}

