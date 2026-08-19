package com.hospital.management.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.hospital.management.entity.Prescription;
import com.hospital.management.repository.PrescriptionRepository;

@Service
public class PrescriptionService {

    private final PrescriptionRepository prescriptionRepository;

    public PrescriptionService(
            PrescriptionRepository prescriptionRepository) {

        this.prescriptionRepository = prescriptionRepository;
    }

    public Prescription createPrescription(
            Prescription prescription) {

        return prescriptionRepository.save(prescription);
    }

    public List<Prescription> getAllPrescriptions() {

        return prescriptionRepository.findAll();
    }

    public List<Prescription> getPrescriptionsByDoctor(
            Integer doctorId) {

        return prescriptionRepository.findByDoctorId(doctorId);
    }

    public List<Prescription> getPrescriptionsByPatient(
            Integer patientId) {

        return prescriptionRepository.findByPatientId(patientId);
    }

    public Prescription getPrescriptionById(
            Integer prescriptionId) {

        return prescriptionRepository.findById(prescriptionId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Prescription not found"));
    }
}