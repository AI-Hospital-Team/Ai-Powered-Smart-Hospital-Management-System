package com.hospital.management.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hospital.management.dto.LoginResponse;
import com.hospital.management.entity.Doctor;
import com.hospital.management.entity.PasswordResetOtp;
import com.hospital.management.entity.Patient;
import com.hospital.management.entity.User;
import com.hospital.management.repository.DoctorRepository;
import com.hospital.management.repository.PasswordResetOtpRepository;
import com.hospital.management.repository.PatientRepository;
import com.hospital.management.repository.UserRepository;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;
    private final NotificationService notificationService;
    private final PasswordResetOtpRepository passwordResetOtpRepository;
    private final EmailService emailService;

    // =====================================================
    // CONSTRUCTOR
    // =====================================================

    public AuthService(
            UserRepository userRepository,
            PatientRepository patientRepository,
            DoctorRepository doctorRepository,
            NotificationService notificationService,
            PasswordResetOtpRepository passwordResetOtpRepository,
            EmailService emailService) {

        this.userRepository = userRepository;
        this.patientRepository = patientRepository;
        this.doctorRepository = doctorRepository;
        this.notificationService = notificationService;
        this.passwordResetOtpRepository = passwordResetOtpRepository;
        this.emailService = emailService;
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
    // FORGOT PASSWORD - SEND OTP
    // =====================================================

    @Transactional
    public void sendPasswordResetOtp(String email) {

        // -------------------------------------------------
        // VALIDATE EMAIL
        // -------------------------------------------------

        if (email == null || email.trim().isEmpty()) {
            throw new RuntimeException("Email is required");
        }

        String cleanEmail = email.trim();

        // -------------------------------------------------
        // FIND USER
        // -------------------------------------------------

        User user = userRepository
                .findByEmail(cleanEmail)
                .orElseThrow(() ->
                        new RuntimeException(
                                "No account found with this email"
                        )
                );

        // -------------------------------------------------
        // GENERATE 6 DIGIT OTP
        // -------------------------------------------------

        Random random = new Random();

        String otp = String.format(
                "%06d",
                random.nextInt(1000000)
        );

        // -------------------------------------------------
        // OTP EXPIRES AFTER 5 MINUTES
        // -------------------------------------------------

        LocalDateTime expiresAt =
                LocalDateTime.now().plusMinutes(5);

        // -------------------------------------------------
        // DELETE PREVIOUS OTP
        // -------------------------------------------------

        passwordResetOtpRepository
                .findTopByEmailOrderByIdDesc(cleanEmail)
                .ifPresent(existingOtp ->
                        passwordResetOtpRepository.delete(existingOtp)
                );

        // -------------------------------------------------
        // CREATE NEW OTP
        // -------------------------------------------------

        PasswordResetOtp resetOtp =
                new PasswordResetOtp(
                        cleanEmail,
                        otp,
                        expiresAt
                );

        passwordResetOtpRepository.save(resetOtp);

        // -------------------------------------------------
        // SEND OTP EMAIL
        // -------------------------------------------------

        try {

            emailService.sendOtpEmail(
                    cleanEmail,
                    otp
            );

        } catch (Exception e) {

            // Remove OTP if email sending fails
            passwordResetOtpRepository.delete(resetOtp);

            throw new RuntimeException(
                    "Unable to send OTP email. Please try again."
            );
        }
    }

    // =====================================================
    // VERIFY PASSWORD RESET OTP
    // =====================================================

    @Transactional
    public void verifyPasswordResetOtp(
            String email,
            String otp) {

        // -------------------------------------------------
        // VALIDATE INPUT
        // -------------------------------------------------

        if (email == null || email.trim().isEmpty()) {
            throw new RuntimeException("Email is required");
        }

        if (otp == null || otp.trim().isEmpty()) {
            throw new RuntimeException("OTP is required");
        }

        String cleanEmail = email.trim();
        String cleanOtp = otp.trim();

        // -------------------------------------------------
        // FIND LATEST OTP
        // -------------------------------------------------

        PasswordResetOtp resetOtp =
                passwordResetOtpRepository
                        .findTopByEmailOrderByIdDesc(cleanEmail)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "OTP not found. Please request a new OTP."
                                )
                        );

        // -------------------------------------------------
        // CHECK IF ALREADY USED
        // -------------------------------------------------

        if (resetOtp.isUsed()) {

            throw new RuntimeException(
                    "This OTP has already been used."
            );
        }

        // -------------------------------------------------
        // CHECK EXPIRY
        // -------------------------------------------------

        if (LocalDateTime.now()
                .isAfter(resetOtp.getExpiresAt())) {

            throw new RuntimeException(
                    "OTP has expired. Please request a new OTP."
            );
        }

        // -------------------------------------------------
        // CHECK OTP
        // -------------------------------------------------

        if (!resetOtp.getOtp().equals(cleanOtp)) {

            throw new RuntimeException(
                    "Invalid OTP."
            );
        }

        // -------------------------------------------------
        // MARK OTP AS VERIFIED
        // -------------------------------------------------

        resetOtp.setVerified(true);

        passwordResetOtpRepository.save(resetOtp);
    }

    // =====================================================
    // RESET PASSWORD
    // =====================================================

    @Transactional
    public void resetPassword(
            String email,
            String otp,
            String newPassword) {

        // -------------------------------------------------
        // VALIDATE INPUT
        // -------------------------------------------------

        if (email == null || email.trim().isEmpty()) {
            throw new RuntimeException("Email is required");
        }

        if (otp == null || otp.trim().isEmpty()) {
            throw new RuntimeException("OTP is required");
        }

        if (newPassword == null ||
                newPassword.trim().isEmpty()) {

            throw new RuntimeException(
                    "New password is required"
            );
        }

        if (newPassword.length() < 6) {

            throw new RuntimeException(
                    "Password must be at least 6 characters"
            );
        }

        String cleanEmail = email.trim();
        String cleanOtp = otp.trim();

        // -------------------------------------------------
        // FIND OTP
        // -------------------------------------------------

        PasswordResetOtp resetOtp =
                passwordResetOtpRepository
                        .findTopByEmailOrderByIdDesc(cleanEmail)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "OTP not found. Please request a new OTP."
                                )
                        );

        // -------------------------------------------------
        // CHECK OTP
        // -------------------------------------------------

        if (!resetOtp.getOtp().equals(cleanOtp)) {

            throw new RuntimeException(
                    "Invalid OTP."
            );
        }

        // -------------------------------------------------
        // CHECK VERIFIED
        // -------------------------------------------------

        if (!resetOtp.isVerified()) {

            throw new RuntimeException(
                    "Please verify the OTP first."
            );
        }

        // -------------------------------------------------
        // CHECK USED
        // -------------------------------------------------

        if (resetOtp.isUsed()) {

            throw new RuntimeException(
                    "This OTP has already been used."
            );
        }

        // -------------------------------------------------
        // CHECK EXPIRY
        // -------------------------------------------------

        if (LocalDateTime.now()
                .isAfter(resetOtp.getExpiresAt())) {

            throw new RuntimeException(
                    "OTP has expired. Please request a new OTP."
            );
        }

        // -------------------------------------------------
        // FIND USER
        // -------------------------------------------------

        User user = userRepository
                .findByEmail(cleanEmail)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User account not found."
                        )
                );

        // -------------------------------------------------
        // UPDATE PASSWORD
        // -------------------------------------------------

        user.setPassword(newPassword);

        userRepository.save(user);

        // -------------------------------------------------
        // MARK OTP AS USED
        // -------------------------------------------------

        resetOtp.setUsed(true);

        passwordResetOtpRepository.save(resetOtp);
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

        // Backend decides the role
        user.setRole("Doctor");

        // Doctor cannot login until Admin approves
        user.setStatus("PENDING");

        // -------------------------------------------------
        // CONNECT USER ACCOUNT WITH DOCTOR APPLICATION
        // -------------------------------------------------

        user.setDoctorId(
                savedDoctor.getDoctorId()
        );

        User savedUser =
                userRepository.save(user);

        // =================================================
        // NOTIFY ALL ADMINS
        // =================================================

        List<User> admins =
                userRepository.findByRoleIgnoreCase("ADMIN");

        for (User admin : admins) {

            notificationService.notifyAdmin(
                    admin.getUserId(),
                    "New Doctor Registration",
                    "Dr. "
                            + savedDoctor.getName()
                            + " has registered and is waiting for Admin approval.",
                    "NEW_DOCTOR_REGISTERED",
                    savedDoctor.getDoctorId()
            );
        }

        return savedUser;
    }
}