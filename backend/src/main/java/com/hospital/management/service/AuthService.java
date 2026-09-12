package com.hospital.management.service;

import java.time.LocalDate;

import com.hospital.management.dto.LoginResponse;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hospital.management.entity.Doctor;
import com.hospital.management.entity.Patient;
import com.hospital.management.entity.User;
import com.hospital.management.repository.DoctorRepository;
import com.hospital.management.repository.PatientRepository;
import com.hospital.management.repository.UserRepository;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;

    public AuthService(
            UserRepository userRepository,
            PatientRepository patientRepository,
            DoctorRepository doctorRepository) {

        this.userRepository = userRepository;
        this.patientRepository = patientRepository;
        this.doctorRepository = doctorRepository;
    }

    // =====================================================
    // LOGIN
    // =====================================================

    public LoginResponse login(
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
        // CHECK ACCOUNT STATUS
        // -------------------------------------------------

        if ("PENDING".equalsIgnoreCase(user.getStatus())) {

            throw new RuntimeException(
                    "Doctor account is pending Admin approval"
            );
        }

        if ("REJECTED".equalsIgnoreCase(user.getStatus())) {

            throw new RuntimeException(
                    "Doctor application was rejected"
            );
        }

        if (!"ACTIVE".equalsIgnoreCase(user.getStatus())) {

            throw new RuntimeException(
                    "Account is not active"
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

            Integer patientId = null;
            String patientName = null;

            if (patient != null) {

                patientId = patient.getPatientId();
                patientName = patient.getName();
            }

            return new LoginResponse(
                    user.getUserId(),
                    user.getEmail(),
                    user.getRole(),
                    patientId,
                    user.getDoctorId(),
                    patientName
            );
        }

        // -------------------------------------------------
        // DOCTOR / ADMIN LOGIN
        // -------------------------------------------------

        return new LoginResponse(
                user.getUserId(),
                user.getEmail(),
                user.getRole(),
                user.getPatientId(),
                user.getDoctorId(),
                null
        );
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
            String gender,
            String bloodGroup,
            String address) {

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

        if (bloodGroup == null || bloodGroup.trim().isEmpty()) {
            throw new RuntimeException("Blood group is required");
        }

        if (address == null || address.trim().isEmpty()) {
            throw new RuntimeException("Address is required");
        }

        String cleanName = fullName.trim();
        String cleanEmail = email.trim();
        String cleanMobile = mobile.trim();
        String cleanGender = gender.trim();
        String cleanBloodGroup = bloodGroup.trim();
        String cleanAddress = address.trim();

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

        // -------------------------------------------------
        // CHECK DATE OF BIRTH
        // -------------------------------------------------

        LocalDate today = LocalDate.now();

        if (dateOfBirth.isAfter(today)) {

            throw new RuntimeException(
                    "Date of birth cannot be in the future"
            );
        }

        // -------------------------------------------------
        // CALCULATE AGE
        // -------------------------------------------------

        int calculatedAge =
                java.time.Period
                        .between(dateOfBirth, today)
                        .getYears();

        if (calculatedAge < 0 || calculatedAge > 120) {

            throw new RuntimeException(
                    "Invalid age"
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
        patient.setAge(calculatedAge);
        patient.setBloodGroup(cleanBloodGroup);
        patient.setAddress(cleanAddress);

        Patient savedPatient =
                patientRepository.save(patient);

        // =================================================
        // CREATE LOGIN USER
        // =================================================

        User user = new User();

        user.setEmail(cleanEmail);
        user.setPassword(password);
        user.setRole("Patient");

        // Patient accounts are immediately active
        user.setStatus("ACTIVE");

        // -------------------------------------------------
        // CONNECT USER ACCOUNT WITH PATIENT RECORD
        // -------------------------------------------------

        user.setPatientId(
                savedPatient.getPatientId()
        );

        User savedUser =
                userRepository.save(user);

        return savedUser;
    }

    // =====================================================
    // DOCTOR REGISTRATION
    // =====================================================

    @Transactional
    public User registerDoctor(
            String fullName,
            String email,
            String password,
            String mobile,
            String dob,
            String gender,
            String specialization,
            String qualification,
            String medicalRegistrationNo,
            String hospitalAssociation,
            String address) {

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

        if (specialization == null ||
                specialization.trim().isEmpty()) {

            throw new RuntimeException(
                    "Specialization is required"
            );
        }

        if (qualification == null ||
                qualification.trim().isEmpty()) {

            throw new RuntimeException(
                    "Qualification is required"
            );
        }

        if (medicalRegistrationNo == null ||
                medicalRegistrationNo.trim().isEmpty()) {

            throw new RuntimeException(
                    "Medical registration number is required"
            );
        }

        if (hospitalAssociation == null ||
                hospitalAssociation.trim().isEmpty()) {

            throw new RuntimeException(
                    "Hospital association is required"
            );
        }

        if (address == null || address.trim().isEmpty()) {
            throw new RuntimeException("Address is required");
        }

        String cleanName = fullName.trim();
        String cleanEmail = email.trim();
        String cleanMobile = mobile.trim();
        String cleanGender = gender.trim();
        String cleanAddress = address.trim();

        String cleanSpecialization =
                specialization.trim();

        String cleanQualification =
                qualification.trim();

        String cleanMedicalRegistrationNo =
                medicalRegistrationNo.trim();

        String cleanHospitalAssociation =
                hospitalAssociation.trim();

        // -------------------------------------------------
        // CHECK DUPLICATE EMAIL
        // -------------------------------------------------

        if (userRepository.findByEmail(cleanEmail).isPresent()) {

            throw new RuntimeException(
                    "Email already registered"
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

        // -------------------------------------------------
        // CHECK DATE OF BIRTH
        // -------------------------------------------------

        LocalDate today = LocalDate.now();

        if (dateOfBirth.isAfter(today)) {

            throw new RuntimeException(
                    "Date of birth cannot be in the future"
            );
        }

        // -------------------------------------------------
        // CALCULATE DOCTOR AGE
        // -------------------------------------------------

        int calculatedAge =
                java.time.Period
                        .between(dateOfBirth, today)
                        .getYears();

        if (calculatedAge < 18 || calculatedAge > 120) {

            throw new RuntimeException(
                    "Invalid doctor age"
            );
        }

        // =================================================
        // CREATE DOCTOR APPLICATION
        // =================================================

        Doctor doctor = new Doctor();

        doctor.setName(cleanName);
        doctor.setEmail(cleanEmail);
        doctor.setPhone(cleanMobile);

        // Personal details
        doctor.setDob(dateOfBirth);
        doctor.setGender(cleanGender);
        doctor.setAddress(cleanAddress);

        // Professional details
        doctor.setSpecialization(cleanSpecialization);
        doctor.setQualification(cleanQualification);

        doctor.setMedicalRegistrationNo(
                cleanMedicalRegistrationNo
        );

        doctor.setHospitalAssociation(
                cleanHospitalAssociation
        );

        // -------------------------------------------------
        // IMPORTANT:
        // Doctor must be reviewed by Admin first.
        // -------------------------------------------------

        doctor.setStatus("PENDING");

        Doctor savedDoctor =
                doctorRepository.save(doctor);

        // =================================================
        // CREATE DOCTOR LOGIN ACCOUNT
        // =================================================

        User user = new User();

        user.setEmail(cleanEmail);
        user.setPassword(password);

        // Never trust frontend role.
        // Backend decides that this is a Doctor.
        user.setRole("Doctor");

        // Doctor cannot login until Admin approves.
        user.setStatus("PENDING");

        // -------------------------------------------------
        // CONNECT USER ACCOUNT WITH DOCTOR APPLICATION
        // -------------------------------------------------

        user.setDoctorId(
                savedDoctor.getDoctorId()
        );

        User savedUser =
                userRepository.save(user);

        return savedUser;
    }
}