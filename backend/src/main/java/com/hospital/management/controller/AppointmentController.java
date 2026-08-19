package com.hospital.management.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hospital.management.entity.Appointment;
import com.hospital.management.service.AppointmentService;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = "http://localhost:5173")
public class AppointmentController {

    private final AppointmentService appointmentService;

    public AppointmentController(
            AppointmentService appointmentService) {

        this.appointmentService = appointmentService;
    }

    // ==========================================
    // CREATE APPOINTMENT
    // ==========================================

    @PostMapping
    public ResponseEntity<Appointment> createAppointment(
            @RequestBody Appointment appointment) {

        Appointment savedAppointment =
                appointmentService.createAppointment(
                        appointment
                );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(savedAppointment);
    }

    // ==========================================
    // GET ALL APPOINTMENTS
    // ==========================================

    @GetMapping
    public ResponseEntity<List<Appointment>> getAllAppointments() {

        return ResponseEntity.ok(
                appointmentService.getAllAppointments()
        );
    }

    // ==========================================
    // GET APPOINTMENTS BY DOCTOR
    // ==========================================

    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<List<Appointment>>
            getAppointmentsByDoctor(
                    @PathVariable Integer doctorId) {

        return ResponseEntity.ok(
                appointmentService
                        .getAppointmentsByDoctor(doctorId)
        );
    }

    // ==========================================
    // GET APPOINTMENTS BY PATIENT
    // ==========================================

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<Appointment>>
            getAppointmentsByPatient(
                    @PathVariable Integer patientId) {

        return ResponseEntity.ok(
                appointmentService
                        .getAppointmentsByPatient(patientId)
        );
    }

    // ==========================================
    // UPDATE APPOINTMENT STATUS
    // ==========================================

    @PutMapping("/{appointmentId}/status")
    public ResponseEntity<Appointment>
            updateAppointmentStatus(
                    @PathVariable Integer appointmentId,
                    @RequestBody Map<String, String> request) {

        String status = request.get("status");

        if (status == null || status.isBlank()) {
            return ResponseEntity.badRequest().build();
        }

        Appointment updatedAppointment =
                appointmentService.updateAppointmentStatus(
                        appointmentId,
                        status
                );

        return ResponseEntity.ok(updatedAppointment);
    }
}