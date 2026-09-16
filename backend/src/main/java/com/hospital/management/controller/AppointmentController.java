package com.hospital.management.controller;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hospital.management.dto.AppointmentResponse;
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

    // =====================================================
    // CREATE APPOINTMENT
    // =====================================================

    @PostMapping
    public ResponseEntity<?> createAppointment(
            @RequestBody Appointment appointment) {

        try {

            AppointmentResponse response =
                    appointmentService.createAppointment(
                            appointment
                    );

            return ResponseEntity.ok(response);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    // =====================================================
    // GET ALL APPOINTMENTS
    // =====================================================

    @GetMapping
    public ResponseEntity<List<AppointmentResponse>>
            getAllAppointments() {

        return ResponseEntity.ok(
                appointmentService.getAllAppointments()
        );
    }

    // =====================================================
    // GET APPOINTMENTS BY DOCTOR
    // =====================================================

    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<List<AppointmentResponse>>
            getAppointmentsByDoctor(
                    @PathVariable Integer doctorId) {

        return ResponseEntity.ok(
                appointmentService
                        .getAppointmentsByDoctor(doctorId)
        );
    }

    // =====================================================
    // GET APPOINTMENTS BY PATIENT
    // =====================================================

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<AppointmentResponse>>
            getAppointmentsByPatient(
                    @PathVariable Integer patientId) {

        return ResponseEntity.ok(
                appointmentService
                        .getAppointmentsByPatient(patientId)
        );
    }

    // =====================================================
    // UPDATE APPOINTMENT STATUS
    // =====================================================

    @PutMapping("/{appointmentId}/status")
    public ResponseEntity<?> updateAppointmentStatus(
            @PathVariable Integer appointmentId,
            @RequestBody Map<String, String> request) {

        try {

            String status = request.get("status");

            if (status == null || status.isBlank()) {

                return ResponseEntity
                        .badRequest()
                        .body("Status is required.");
            }

            AppointmentResponse response =
                    appointmentService
                            .updateAppointmentStatus(
                                    appointmentId,
                                    status
                            );

            return ResponseEntity.ok(response);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    // =====================================================
    // RESCHEDULE APPOINTMENT
    // =====================================================

    @PutMapping("/{appointmentId}/reschedule")
    public ResponseEntity<?> rescheduleAppointment(
            @PathVariable Integer appointmentId,
            @RequestBody Map<String, String> request) {

        try {

            String dateString =
                    request.get("appointmentDate");

            String timeString =
                    request.get("appointmentTime");

            if (dateString == null ||
                    dateString.isBlank()) {

                return ResponseEntity
                        .badRequest()
                        .body("New appointment date is required.");
            }

            if (timeString == null ||
                    timeString.isBlank()) {

                return ResponseEntity
                        .badRequest()
                        .body("New appointment time is required.");
            }

            LocalDate newDate =
                    LocalDate.parse(dateString);

            LocalTime newTime =
                    LocalTime.parse(timeString);

            AppointmentResponse response =
                    appointmentService
                            .rescheduleAppointment(
                                    appointmentId,
                                    newDate,
                                    newTime
                            );

            return ResponseEntity.ok(response);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());

        } catch (Exception e) {

            return ResponseEntity
                    .badRequest()
                    .body("Invalid date or time format.");
        }
    }

    // =====================================================
    // CANCEL APPOINTMENT
    // =====================================================

    @PutMapping("/{appointmentId}/cancel")
    public ResponseEntity<?> cancelAppointment(
            @PathVariable Integer appointmentId) {

        try {

            AppointmentResponse response =
                    appointmentService
                            .cancelAppointment(
                                    appointmentId
                            );

            return ResponseEntity.ok(response);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }
}