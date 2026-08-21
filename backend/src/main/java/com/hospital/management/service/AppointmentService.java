package com.hospital.management.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.hospital.management.entity.Appointment;
import com.hospital.management.repository.AppointmentRepository;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;

    public AppointmentService(
            AppointmentRepository appointmentRepository) {

        this.appointmentRepository = appointmentRepository;
    }

    // =====================================================
    // CREATE APPOINTMENT
    // =====================================================

    public Appointment createAppointment(
            Appointment appointment) {

        if (appointment.getStatus() == null ||
                appointment.getStatus().isBlank()) {

            appointment.setStatus("Pending");
        }

        return appointmentRepository.save(appointment);
    }

    // =====================================================
    // GET ALL APPOINTMENTS
    // =====================================================

    public List<Appointment> getAllAppointments() {

        return appointmentRepository.findAll();
    }

    // =====================================================
    // GET BY DOCTOR
    // =====================================================

    public List<Appointment> getAppointmentsByDoctor(
            Integer doctorId) {

        return appointmentRepository
                .findByDoctorId(doctorId);
    }

    // =====================================================
    // GET BY PATIENT
    // =====================================================

    public List<Appointment> getAppointmentsByPatient(
            Integer patientId) {

        return appointmentRepository
                .findByPatientId(patientId);
    }

    // =====================================================
    // UPDATE STATUS
    // =====================================================

    public Appointment updateAppointmentStatus(
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

        return appointmentRepository.save(appointment);
    }

    // =====================================================
    // CANCEL APPOINTMENT
    // =====================================================

    public Appointment cancelAppointment(
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

        // Prevent cancelling an already completed appointment
        if ("Completed".equalsIgnoreCase(
                appointment.getStatus())) {

            throw new RuntimeException(
                    "Completed appointment cannot be cancelled."
            );
        }

        // Prevent cancelling an already cancelled appointment
        if ("Cancelled".equalsIgnoreCase(
                appointment.getStatus())) {

            throw new RuntimeException(
                    "Appointment is already cancelled."
            );
        }

        appointment.setStatus("Cancelled");

        return appointmentRepository.save(appointment);
    }
}