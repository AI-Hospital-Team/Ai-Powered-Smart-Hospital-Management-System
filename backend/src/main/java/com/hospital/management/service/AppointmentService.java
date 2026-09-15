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

        // Prevent booking an appointment in the past
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

        // Default status
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

            // Do not change already finished appointments
            if ("Completed".equalsIgnoreCase(status) ||
                    "Cancelled".equalsIgnoreCase(status) ||
                    "Rejected".equalsIgnoreCase(status) ||
                    "Expired".equalsIgnoreCase(status)) {

                continue;
            }

            // Mark past appointment as Expired
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
    // GET BY DOCTOR
    // =====================================================

    public List<AppointmentResponse> getAppointmentsByDoctor(
            Integer doctorId) {

        return toResponseList(
                appointmentRepository
                        .findByDoctorId(doctorId)
        );
    }

    // =====================================================
    // GET BY PATIENT
    // =====================================================

    public List<AppointmentResponse> getAppointmentsByPatient(
            Integer patientId) {

        return toResponseList(
                appointmentRepository
                        .findByPatientId(patientId)
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

        // Completed appointment cannot be rescheduled
        if ("Completed".equalsIgnoreCase(currentStatus)) {

            throw new RuntimeException(
                    "Completed appointment cannot be rescheduled."
            );
        }

        // Cancelled appointment cannot be rescheduled
        if ("Cancelled".equalsIgnoreCase(currentStatus)) {

            throw new RuntimeException(
                    "Cancelled appointment cannot be rescheduled."
            );
        }

        // Rejected appointment cannot be rescheduled
        if ("Rejected".equalsIgnoreCase(currentStatus)) {

            throw new RuntimeException(
                    "Rejected appointment cannot be rescheduled."
            );
        }

        // Validate date and time
        if (newDate == null || newTime == null) {

            throw new RuntimeException(
                    "New appointment date and time are required."
            );
        }

        // Prevent selecting a past date/time
        LocalDateTime newAppointmentDateTime =
                LocalDateTime.of(newDate, newTime);

        if (newAppointmentDateTime.isBefore(
                LocalDateTime.now())) {

            throw new RuntimeException(
                    "New appointment date and time cannot be in the past."
            );
        }

        // Update date
        appointment.setAppointmentDate(newDate);

        // Update time
        appointment.setAppointmentTime(newTime);

        // Needs confirmation again
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

        // Prevent cancelling completed appointment
        if ("Completed".equalsIgnoreCase(
                appointment.getStatus())) {

            throw new RuntimeException(
                    "Completed appointment cannot be cancelled."
            );
        }

        // Prevent cancelling already cancelled appointment
        if ("Cancelled".equalsIgnoreCase(
                appointment.getStatus())) {

            throw new RuntimeException(
                    "Appointment is already cancelled."
            );
        }

        // Prevent cancelling expired appointment
        if ("Expired".equalsIgnoreCase(
                appointment.getStatus())) {

            throw new RuntimeException(
                    "Expired appointment cannot be cancelled."
            );
        }

        appointment.setStatus("Cancelled");

        Appointment cancelledAppointment =
                appointmentRepository.save(appointment);

        return toResponse(cancelledAppointment);
    }
}