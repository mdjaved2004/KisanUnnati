package com.KisanUnnatiBackend.controller;

import com.KisanUnnatiBackend.dto.PredictionDTO;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class PredictionController {

    private final String FASTAPI_URL = "http://127.0.0.1:8000/predict";

    @PostMapping("/predict")
    public ResponseEntity<?> predict(@RequestParam("file") MultipartFile file) {
        System.out.println("➡ Inside /api/predict");

        try {
            RestTemplate restTemplate = new RestTemplate();

            // Wrap uploaded file into a ByteArrayResource
            ByteArrayResource resource = new ByteArrayResource(file.getBytes()) {
                @Override
                public String getFilename() {
                    return file.getOriginalFilename();
                }
            };

            // Prepare multipart/form-data body
            MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
            body.add("file", resource);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.MULTIPART_FORM_DATA);

            HttpEntity<MultiValueMap<String, Object>> requestEntity =
                    new HttpEntity<>(body, headers);

            // Send POST request to FastAPI → map response to DTO
            ResponseEntity<PredictionDTO> response =
                    restTemplate.postForEntity(FASTAPI_URL, requestEntity, PredictionDTO.class);

            System.out.println("✅ Response from FastAPI: " + response.getBody());

            // Return DTO as JSON to frontend
            return ResponseEntity.ok(response.getBody());

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", e.getMessage()));
        }
    }
}
