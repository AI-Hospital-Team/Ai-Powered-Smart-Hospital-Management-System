package com.hospital.management.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class AIService {

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    public AIService() {
        this.restTemplate = new RestTemplate();
        this.objectMapper = new ObjectMapper();
    }

    public String analyzeSymptoms(String symptoms) {

        String prompt = """
                You are an AI health assistant inside a hospital management system.

                Analyze the patient's symptoms and provide:
                1. A brief general explanation.
                2. A suitable hospital department to consult.
                3. Basic safety guidance.
                4. Whether urgent medical attention may be needed.

                Important:
                - Do not provide a definitive diagnosis.
                - Do not prescribe medicines.
                - Do not replace a qualified doctor.
                - Clearly advise the patient to consult a healthcare professional.

                Patient symptoms:
                %s
                """.formatted(symptoms);

        try {

            Map<String, Object> requestBody = Map.of(
                    "model", "llama3.2",
                    "prompt", prompt,
                    "stream", false
            );

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<Map<String, Object>> request =
                    new HttpEntity<>(requestBody, headers);

            ResponseEntity<String> response = restTemplate.exchange(
                    "http://localhost:11434/api/generate",
                    HttpMethod.POST,
                    request,
                    String.class
            );

            JsonNode root = objectMapper.readTree(response.getBody());

            JsonNode responseText = root.path("response");

            if (!responseText.isMissingNode()) {
                return responseText.asText();
            }

            return "AI response was received, but the text could not be extracted.";

        } catch (Exception e) {
            throw new RuntimeException(
                    "Ollama AI service error: " + e.getMessage(),
                    e
            );
        }
    }
}