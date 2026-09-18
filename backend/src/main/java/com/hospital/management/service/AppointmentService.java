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
    private final NotificationService notificationService;

    public AppointmentService(
            AppointmentRepository appointmentRepository,
            DoctorRepository doctorRepository,
            NotificationService notificationService) {

        this.appointmentRepository = appointmentRepository;
        this.doctorRepository = doctorRepository;
        this.notificationService = notificationService;
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
    // APPOINTMENT TOMORROW NOTIFICATION
    // Runs every 1 hour
    // =====================================================

    @Scheduled(fixedRate = 3600000)
    public void sendAppointmentTomorrowNotifications() {

        List<Appointment> appointments =
                appointmentRepository.findAll();

        LocalDate tomorrow =
                LocalDate.now().plusDays(1);

        for (Appointment appointment : appointments) {

            if (appointment.getAppointmentDate() == null) {
                continue;
            }

            if (!tomorrow.equals(
                    appointment.getAppointmentDate())) {

                continue;
            }

            String status = appointment.getStatus();

            if ("Cancelled".equalsIgnoreCase(status) ||
                    "Rejected".equalsIgnoreCase(status) ||
                    "Expired".equalsIgnoreCase(status)) {

                continue;
            }

            notificationService.createNotification(
                    appointment.getPatientId(),
                    "PATIENT",
                    "Appointment Tomorrow",
                    "Reminder: You have an appointment tomorrow at "
                            + appointment.getAppointmentTime()
                            + ".",
                    "APPOINTMENT_TOMORROW",
                    appointment.getAppointmentId()
            );
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
            String newStatus) {

        Appointment appointment =
                appointmentRepository
                        .findById(appointmentId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Appointment not found with ID: "
                                                + appointmentId
                                )
                        );

        if (newStatus == null ||
                newStatus.isBlank()) {

            throw new RuntimeException(
                    "Appointment status is required."
            );
        }

        String currentStatus =
                appointment.getStatus() == null
                        ? "Pending"
                        : appointment.getStatus().trim();

        String requestedStatus =
                newStatus.trim();

        // =================================================
        // FINAL STATUSES
        // =================================================

        if ("Completed".equalsIgnoreCase(currentStatus)) {

            throw new RuntimeException(
                    "Completed appointment cannot be changed."
            );
        }

        if ("Cancelled".equalsIgnoreCase(currentStatus)) {

            throw new RuntimeException(
                    "Cancelled appointment cannot be changed."
            );
        }

        if ("Rejected".equalsIgnoreCase(currentStatus)) {

            throw new RuntimeException(
                    "Rejected appointment cannot be changed."
            );
        }

        if ("Expired".equalsIgnoreCase(currentStatus)) {

            throw new RuntimeException(
                    "Expired appointment must be rescheduled before confirmation."
            );
        }

        // =================================================
        // PENDING
        // Pending → Confirmed
        // Pending → Cancelled
        // =================================================

        if ("Pending".equalsIgnoreCase(currentStatus)) {

            if (!"Confirmed".equalsIgnoreCase(requestedStatus) &&
                    !"Cancelled".equalsIgnoreCase(requestedStatus)) {

                throw new RuntimeException(
                        "Pending appointment can only be Confirmed or Cancelled."
                );
            }
        }

        // =================================================
        // CONFIRMED
        // Confirmed → Completed
        // Confirmed → Cancelled
        // =================================================

        else if ("Confirmed".equalsIgnoreCase(currentStatus)) {

            if (!"Completed".equalsIgnoreCase(requestedStatus) &&
                    !"Cancelled".equalsIgnoreCase(requestedStatus)) {

                throw new RuntimeException(
                        "Confirmed appointment can only be Completed or Cancelled."
                );
            }
        }

        // =================================================
        // UPDATE
        // =================================================

        appointment.setStatus(requestedStatus);

        Appointment updatedAppointment =
                appointmentRepository.save(appointment);

        // =================================================
        // APPOINTMENT CONFIRMED NOTIFICATION
        // =================================================

        if ("Confirmed".equalsIgnoreCase(requestedStatus)) {

            notificationService.createNotification(
                    appointment.getPatientId(),
                    "PATIENT",
                    "Appointment Confirmed",
                    "Your appointment has been confirmed for "
                            + appointment.getAppointmentDate()
                            + " at "
                            + appointment.getAppointmentTime()
                            + ".",
                    "APPOINTMENT_CONFIRMED",
                    appointment.getAppointmentId()
            );
        }

        // =================================================
        // APPOINTMENT CANCELLED NOTIFICATION
        // =================================================

        if ("Cancelled".equalsIgnoreCase(requestedStatus)) {

            notificationService.createNotification(
                    appointment.getPatientId(),
                    "PATIENT",
                    "Appointment Cancelled",
                    "Your appointment scheduled for "
                            + appointment.getAppointmentDate()
                            + " at "
                            + appointment.getAppointmentTime()
                            + " has been cancelled.",
                    "APPOINTMENT_CANCELLED",
                    appointment.getAppointmentId()
            );
        }

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

        String currentStatus =
                appointment.getStatus();

        if (!"Pending".equalsIgnoreCase(currentStatus) &&
                !"Expired".equalsIgnoreCase(currentStatus)) {

            throw new RuntimeException(
                    "Only Pending or Expired appointments can be rescheduled."
            );
        }

        if (newDate == null || newTime == null) {

            throw new RuntimeException(
                    "New appointment date and time are required."
            );
        }

        LocalDateTime newAppointmentDateTime =
                LocalDateTime.of(newDate, newTime);

        if (newAppointmentDateTime.isBefore(
                LocalDateTime.now())) {

            throw new RuntimeException(
                    "New appointment date and time cannot be in the past."
            );
        }

        appointment.setAppointmentDate(newDate);
        appointment.setAppointmentTime(newTime);

        appointment.setStatus("Pending");

        Appointment updatedAppointment =
                appointmentRepository.save(appointment);

        // =================================================
        // RESCHEDULE NOTIFICATION
        // =================================================

        notificationService.createNotification(
                appointment.getPatientId(),
                "PATIENT",
                "Appointment Rescheduled",
                "Your appointment has been rescheduled to "
                        + newDate
                        + " at "
                        + newTime
                        + ".",
                "APPOINTMENT_RESCHEDULED",
                appointment.getAppointmentId()
        );

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

        if ("Completed".equalsIgnoreCase(
                appointment.getStatus())) {

            throw new RuntimeException(
                    "Completed appointment cannot be cancelled."
            );
        }

        if ("Cancelled".equalsIgnoreCase(
                appointment.getStatus())) {

            throw new RuntimeException(
                    "Appointment is already cancelled."
            );
        }

        if ("Expired".equalsIgnoreCase(
                appointment.getStatus())) {

            throw new RuntimeException(
                    "Expired appointment cannot be cancelled. Please reschedule the appointment."
            );
        }

        appointment.setStatus("Cancelled");

        Appointment cancelledAppointment =
                appointmentRepository.save(appointment);

        // =================================================
        // PATIENT CANCELLATION NOTIFICATION
        // =================================================

        notificationService.createNotification(
                appointment.getPatientId(),
                "PATIENT",
                "Appointment Cancelled",
                "Your appointment scheduled for "
                        + appointment.getAppointmentDate()
                        + " at "
                        + appointment.getAppointmentTime()
                        + " has been cancelled.",
                "APPOINTMENT_CANCELLED",
                appointment.getAppointmentId()
        );

        return toResponse(cancelledAppointment);
    }
}