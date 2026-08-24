package com.hospital.management.service;

import java.time.LocalDate;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hospital.management.entity.Patient;
import com.hospital.management.entity.User;
import com.hospital.management.repository.PatientRepository;
import com.hospital.management.repository.UserRepository;

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

    // =====================================================
    // LOGIN
    // =====================================================

    public User login(
            String email,
            String password,
            String role) {

        if (email == null || email.trim().isEmpty()) {
            throw new RuntimeException("Email is required");
        }

        if (password == null || password.isEmpty()) {
            throw new RuntimeException("Password is required");
        }

        if (role == null || role.trim().isEmpty()) {
            throw new RuntimeException("Role is required");
        }

        String cleanEmail = email.trim();
        String cleanRole = role.trim();

        // -------------------------------------------------
        // FIND USER
        // -------------------------------------------------

        User user = userRepository
                .findByEmail(cleanEmail)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Invalid email or password"
                        )
                );

        // -------------------------------------------------
        // CHECK PASSWORD
        // -------------------------------------------------

        if (user.getPassword() == null ||
                !user.getPassword().equals(password)) {

            throw new RuntimeException(
                    "Invalid email or password"
            );
        }

        // -------------------------------------------------
        // CHECK ROLE
        // -------------------------------------------------

        if (user.getRole() == null ||
                !user.getRole().equalsIgnoreCase(cleanRole)) {

            throw new RuntimeException("Invalid role");
        }

        // -------------------------------------------------
        // PATIENT LOGIN
        // -------------------------------------------------

        if ("Patient".equalsIgnoreCase(cleanRole)) {

            Patient patient = patientRepository
                    .findByEmail(cleanEmail)
                    .orElse(null);

            if (patient != null) {

                user.setPatientId(
                        patient.getPatientId()
                );
            }
        }

        return user;
    }

    // =====================================================
    // PATIENT REGISTRATION
    // =====================================================

    @Transactional
    public User registerPatient(
            String fullName,
            String email,
            String password,
            String mobile,
            String dob,
            String gender) {

        // -------------------------------------------------
        // VALIDATION
        // -------------------------------------------------

        if (fullName == null || fullName.trim().isEmpty()) {
            throw new RuntimeException("Full name is required");
        }

        if (email == null || email.trim().isEmpty()) {
            throw new RuntimeException("Email is required");
        }

        if (password == null || password.trim().isEmpty()) {
            throw new RuntimeException("Password is required");
        }

        if (mobile == null || mobile.trim().isEmpty()) {
            throw new RuntimeException("Mobile number is required");
        }

        if (dob == null || dob.trim().isEmpty()) {
            throw new RuntimeException("Date of birth is required");
        }

        if (gender == null || gender.trim().isEmpty()) {
            throw new RuntimeException("Gender is required");
        }

        String cleanName = fullName.trim();
        String cleanEmail = email.trim();
        String cleanMobile = mobile.trim();
        String cleanGender = gender.trim();

        // -------------------------------------------------
        // CHECK DUPLICATE EMAIL IN USERS
        // -------------------------------------------------

        if (userRepository.findByEmail(cleanEmail).isPresent()) {

            throw new RuntimeException(
                    "Email already registered"
            );
        }

        // -------------------------------------------------
        // CHECK DUPLICATE EMAIL IN PATIENTS
        // -------------------------------------------------

        if (patientRepository.findByEmail(cleanEmail).isPresent()) {

            throw new RuntimeException(
                    "Patient with this email already exists"
            );
        }

        // -------------------------------------------------
        // CONVERT DOB
        // -------------------------------------------------

        LocalDate dateOfBirth;

        try {

            dateOfBirth = LocalDate.parse(dob);

        } catch (Exception e) {

            throw new RuntimeException(
                    "Invalid date of birth"
            );
        }

        // =================================================
        // CREATE PATIENT
        // =================================================

        Patient patient = new Patient();

        patient.setName(cleanName);
        patient.setEmail(cleanEmail);
        patient.setPhone(cleanMobile);
        patient.setGender(cleanGender);
        patient.setDateOfBirth(dateOfBirth);

        Patient savedPatient =
                patientRepository.save(patient);

        // =================================================
        // CREATE LOGIN USER
        // =================================================

        User user = new User();

        user.setEmail(cleanEmail);
        user.setPassword(password);
        user.setRole("Patient");

        // IMPORTANT:
        // Connect user account with patient record

        user.setPatientId(
                savedPatient.getPatientId()
        );

        User savedUser =
                userRepository.save(user);

        return savedUser;
    }
}