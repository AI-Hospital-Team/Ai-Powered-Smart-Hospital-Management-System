package com.hospital.management.service;

import java.util.List;

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

        if (appointment.getStatus() == null ||
                appointment.getStatus().isBlank()) {

            appointment.setStatus("Pending");
        }

        Appointment savedAppointment =
                appointmentRepository.save(appointment);

        return toResponse(savedAppointment);
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

        appointment.setStatus("Cancelled");

        Appointment cancelledAppointment =
                appointmentRepository.save(appointment);

        return toResponse(cancelledAppointment);
    }
}