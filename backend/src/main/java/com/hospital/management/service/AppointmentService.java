package com.hospital.management.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.hospital.management.dto.AppointmentResponse;
import com.hospital.management.entity.Appointment;
import com.hospital.management.entity.Doctor;
import com.hospital.management.repository.AppointmentRepository;
import com.hospital.management.repository.DoctorRepository;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final DoctorRepository doctorRepository;

    public AppointmentService(
            AppointmentRepository appointmentRepository,
            DoctorRepository doctorRepository) {

        this.appointmentRepository = appointmentRepository;
        this.doctorRepository = doctorRepository;
    }

    // =====================================================
    // CONVERT APPOINTMENT TO RESPONSE DTO
    // =====================================================

    private AppointmentResponse toResponse(
            Appointment appointment) {

        Doctor doctor = doctorRepository
                .findById(appointment.getDoctorId())
                .orElse(null);

        String doctorName = null;
        String specialization = null;

        if (doctor != null) {
            doctorName = doctor.getName();
            specialization = doctor.getSpecialization();
        }

        return new AppointmentResponse(
                appointment.getAppointmentId(),
                appointment.getPatientId(),
                appointment.getDoctorId(),
                doctorName,
                specialization,
                appointment.getAppointmentDate(),
                appointment.getAppointmentTime(),
                appointment.getReason(),
                appointment.getStatus()
        );
    }

    // =====================================================
    // CONVERT LIST
    // =====================================================

    private List<AppointmentResponse> toResponseList(
            List<Appointment> appointments) {

        return appointments.stream()
                .map(this::toResponse)
                .toList();
    }

    // =====================================================
    // CREATE APPOINTMENT
    // =====================================================

    public AppointmentResponse createAppointment(
            Appointment appointment) {

        if (appointment.getAppointmentDate() == null ||
                appointment.getAppointmentTime() == null) {

            throw new RuntimeException(
                    "Appointment date and time are required."
            );
        }

        LocalDateTime appointmentDateTime =
                LocalDateTime.of(
                        appointment.getAppointmentDate(),
                        appointment.getAppointmentTime()
                );

        if (appointmentDateTime.isBefore(
                LocalDateTime.now())) {

            throw new RuntimeException(
                    "Cannot book an appointment in the past."
            );
        }

        if (appointment.getStatus() == null ||
                appointment.getStatus().isBlank()) {

            appointment.setStatus("Pending");
        }

        Appointment savedAppointment =
                appointmentRepository.save(appointment);

        return toResponse(savedAppointment);
    }

    // =====================================================
    // AUTO EXPIRE APPOINTMENTS
    // Runs every 1 minute
    // =====================================================

    @Scheduled(fixedRate = 60000)
    public void expirePastAppointments() {

        List<Appointment> appointments =
                appointmentRepository.findAll();

        LocalDateTime now = LocalDateTime.now();

        for (Appointment appointment : appointments) {

            if (appointment.getAppointmentDate() == null ||
                    appointment.getAppointmentTime() == null) {

                continue;
            }

            LocalDateTime appointmentDateTime =
                    LocalDateTime.of(
                            appointment.getAppointmentDate(),
                            appointment.getAppointmentTime()
                    );

            String status = appointment.getStatus();

            // Do not change finished appointments
            if ("Completed".equalsIgnoreCase(status) ||
                    "Cancelled".equalsIgnoreCase(status) ||
                    "Rejected".equalsIgnoreCase(status) ||
                    "Expired".equalsIgnoreCase(status)) {

                continue;
            }

            if (appointmentDateTime.isBefore(now)) {

                appointment.setStatus("Expired");

                appointmentRepository.save(appointment);
            }
        }
    }

    // =====================================================
    // GET ALL APPOINTMENTS
    // =====================================================

    public List<AppointmentResponse> getAllAppointments() {

        return toResponseList(
                appointmentRepository.findAll()
        );
    }

    // =====================================================
    // GET APPOINTMENTS BY DOCTOR
    // =====================================================

    public List<AppointmentResponse> getAppointmentsByDoctor(
            Integer doctorId) {

        return toResponseList(
                appointmentRepository.findByDoctorId(doctorId)
        );
    }

    // =====================================================
    // GET APPOINTMENTS BY PATIENT
    // =====================================================

    public List<AppointmentResponse> getAppointmentsByPatient(
            Integer patientId) {

        return toResponseList(
                appointmentRepository.findByPatientId(patientId)
        );
    }

    // =====================================================
    // UPDATE APPOINTMENT STATUS
    // =====================================================

    public AppointmentResponse updateAppointmentStatus(
            Integer appointmentId,
            String status) {

        Appointment appointment =
                appointmentRepository
                        .findById(appointmentId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Appointment not found with ID: "
                                                + appointmentId
                                )
                        );

        appointment.setStatus(status);

        Appointment updatedAppointment =
                appointmentRepository.save(appointment);

        return toResponse(updatedAppointment);
    }

    // =====================================================
    // RESCHEDULE APPOINTMENT
    // =====================================================

    public AppointmentResponse rescheduleAppointment(
            Integer appointmentId,
            LocalDate newDate,
            LocalTime newTime) {

        Appointment appointment =
                appointmentRepository
                        .findById(appointmentId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Appointment not found with ID: "
                                                + appointmentId
                                )
                        );

        String currentStatus = appointment.getStatus();

        // =================================================
        // ONLY PENDING AND EXPIRED CAN BE RESCHEDULED
        // =================================================

        if (!"Pending".equalsIgnoreCase(currentStatus) &&
                !"Expired".equalsIgnoreCase(currentStatus)) {

            throw new RuntimeException(
                    "Only Pending or Expired appointments can be rescheduled."
            );
        }

        // =================================================
        // VALIDATE DATE AND TIME
        // =================================================

        if (newDate == null || newTime == null) {

            throw new RuntimeException(
                    "New appointment date and time are required."
            );
        }

        // =================================================
        // PREVENT PAST DATE/TIME
        // =================================================

        LocalDateTime newAppointmentDateTime =
                LocalDateTime.of(newDate, newTime);

        if (newAppointmentDateTime.isBefore(
                LocalDateTime.now())) {

            throw new RuntimeException(
                    "New appointment date and time cannot be in the past."
            );
        }

        // =================================================
        // UPDATE APPOINTMENT
        // =================================================

        appointment.setAppointmentDate(newDate);
        appointment.setAppointmentTime(newTime);

        // Must be confirmed again
        appointment.setStatus("Pending");

        Appointment updatedAppointment =
                appointmentRepository.save(appointment);

        return toResponse(updatedAppointment);
    }

    // =====================================================
    // CANCEL APPOINTMENT
    // =====================================================

    public AppointmentResponse cancelAppointment(
            Integer appointmentId) {

        Appointment appointment =
                appointmentRepository
                        .findById(appointmentId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Appointment not found with ID: "
                                                + appointmentId
                                )
                        );

        // Completed cannot be cancelled
        if ("Completed".equalsIgnoreCase(
                appointment.getStatus())) {

            throw new RuntimeException(
                    "Completed appointment cannot be cancelled."
            );
        }

        // Already cancelled
        if ("Cancelled".equalsIgnoreCase(
                appointment.getStatus())) {

            throw new RuntimeException(
                    "Appointment is already cancelled."
            );
        }

        // Expired cannot be cancelled
        if ("Expired".equalsIgnoreCase(
                appointment.getStatus())) {

            throw new RuntimeException(
                    "Expired appointment cannot be cancelled. Please reschedule the appointment."
            );
        }

        appointment.setStatus("Cancelled");

        Appointment cancelledAppointment =
                appointmentRepository.save(appointment);

        return toResponse(cancelledAppointment);
    }
}