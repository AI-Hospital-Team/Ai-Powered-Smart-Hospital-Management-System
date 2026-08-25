package com.hospital.management.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hospital.management.service.AIService;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "http://localhost:5173")
public class AIController {

    private final AIService aiService;

    public AIController(AIService aiService) {
        this.aiService = aiService;
    }

    @PostMapping("/health-assistant")
    public ResponseEntity<?> healthAssistant(
            @RequestBody Map<String, String> request) {

        String symptoms = request.get("symptoms");

        if (symptoms == null || symptoms.isBlank()) {
            return ResponseEntity.badRequest()
                    .body(Map.of(
                            "error",
                            "Please enter your symptoms."
                    ));
        }

        try {
            String response = aiService.analyzeSymptoms(symptoms);

            return ResponseEntity.ok(
                    Map.of(
                            "response", response
                    )
            );

        } catch (Exception e) {

            return ResponseEntity.internalServerError()
                    .body(Map.of(
                            "error",
                            "Unable to connect to AI service.",
                            "message",
                            e.getMessage()
                    ));
        }
    }
}