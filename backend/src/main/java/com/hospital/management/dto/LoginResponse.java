package com.hospital.management.dto;

public record LoginResponse(
        Integer userId,
        String email,
        String role,
        Integer patientId,
        Integer doctorId,
        String name
) {
}