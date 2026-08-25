package com.hospital.management.dto;

import java.time.LocalDate;
import java.time.LocalTime;

public record AppointmentResponse(
        Integer appointmentId,
        Integer patientId,
        Integer doctorId,
        String doctorName,
        String specialization,
        LocalDate appointmentDate,
        LocalTime appointmentTime,
        String reason,
        String status
) {
}