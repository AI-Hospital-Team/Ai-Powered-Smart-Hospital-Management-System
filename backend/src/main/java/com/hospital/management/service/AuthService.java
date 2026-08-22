package com.hospital.management.service;

import com.hospital.management.entity.Patient;
import com.hospital.management.entity.User;
import com.hospital.management.repository.PatientRepository;
import com.hospital.management.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PatientRepository patientRepository;

    public AuthService(
            UserRepository userRepository,
            PatientRepository patientRepository) {

        this.userRepository = userRepository;
        this.patientRepository = patientRepository;
    }

    public User login(String email, String password, String role) {

        // Find user
        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("Invalid email or password"));

        // Check password
        if (!user.getPassword().equals(password)) {
            throw new RuntimeException("Invalid email or password");
        }

        // Check role
        if (!user.getRole().equalsIgnoreCase(role)) {
            throw new RuntimeException("Invalid role");
        }

        // ==========================================
        // PATIENT LOGIN
        // ==========================================
        if ("Patient".equalsIgnoreCase(role)) {

            Patient patient = patientRepository.findByEmail(email)
                    .orElseThrow(() ->
                            new RuntimeException(
                                    "Patient record not found for this email"
                            ));

            // Connect User with Patient
            user.setPatientId(patient.getPatientId());
        }

        return user;
    }
}   