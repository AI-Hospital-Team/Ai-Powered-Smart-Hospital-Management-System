package com.hospital.management.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hospital.management.dto.LoginResponse;
import com.hospital.management.entity.Doctor;
import com.hospital.management.entity.PasswordResetRequest;
import com.hospital.management.entity.Patient;
import com.hospital.management.entity.User;
import com.hospital.management.repository.DoctorRepository;
import com.hospital.management.repository.PasswordResetRequestRepository;
import com.hospital.management.repository.PatientRepository;
import com.hospital.management.repository.UserRepository;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;
    private final NotificationService notificationService;

    // New Admin Password Reset flow
    private final PasswordResetRequestRepository passwordResetRequestRepository;

    // =====================================================
    // CONSTRUCTOR
    // =====================================================

    public AuthService(
            UserRepository userRepository,
            PatientRepository patientRepository,
            DoctorRepository doctorRepository,
            NotificationService notificationService,
            PasswordResetRequestRepository passwordResetRequestRepository) {

        this.userRepository = userRepository;
        this.patientRepository = patientRepository;
        this.doctorRepository = doctorRepository;
        this.notificationService = notificationService;
        this.passwordResetRequestRepository =
                passwordResetRequestRepository;
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
    // NEW ADMIN PASSWORD RESET REQUEST
    // =====================================================

    @Transactional
    public PasswordResetRequest createPasswordResetRequest(
            String email) {

        // -------------------------------------------------
        // VALIDATE EMAIL
        // -------------------------------------------------

        if (email == null || email.trim().isEmpty()) {
            throw new RuntimeException("Email is required");
        }

        String cleanEmail =
                email.trim().toLowerCase();

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
        // CHECK EXISTING PENDING REQUEST
        // -------------------------------------------------

        passwordResetRequestRepository
                .findTopByEmailOrderByRequestIdDesc(cleanEmail)
                .ifPresent(existing -> {

                    if ("PENDING".equalsIgnoreCase(
                            existing.getStatus())) {

                        throw new RuntimeException(
                                "A password reset request is already pending"
                        );
                    }
                });

        // -------------------------------------------------
        // GENERATE UNIQUE REQUEST CODE
        // -------------------------------------------------

        String requestCode;

        do {

            requestCode =
                    UUID.randomUUID()
                            .toString()
                            .replace("-", "")
                            .substring(0, 8)
                            .toUpperCase();

        } while (
                passwordResetRequestRepository
                        .findByRequestCode(requestCode)
                        .isPresent()
        );

        // -------------------------------------------------
        // CREATE REQUEST
        // -------------------------------------------------

        PasswordResetRequest request =
                new PasswordResetRequest(
                        cleanEmail,
                        user.getRole(),
                        requestCode
                );

        return passwordResetRequestRepository.save(request);
    }

    // =====================================================
    // CHECK PASSWORD RESET REQUEST STATUS
    // =====================================================

    public PasswordResetRequest getPasswordResetStatus(
            String email,
            String requestCode) {

        if (email == null || email.trim().isEmpty()) {
            throw new RuntimeException("Email is required");
        }

        if (requestCode == null ||
                requestCode.trim().isEmpty()) {

            throw new RuntimeException(
                    "Request code is required"
            );
        }

        String cleanEmail =
                email.trim().toLowerCase();

        String cleanRequestCode =
                requestCode.trim().toUpperCase();

        // -------------------------------------------------
        // FIND REQUEST
        // -------------------------------------------------

        PasswordResetRequest request =
                passwordResetRequestRepository
                        .findByRequestCode(cleanRequestCode)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Invalid reset request code"
                                )
                        );

        // -------------------------------------------------
        // CHECK EMAIL
        // -------------------------------------------------

        if (!request.getEmail()
                .equalsIgnoreCase(cleanEmail)) {

            throw new RuntimeException(
                    "Invalid reset request"
            );
        }

        return request;
    }

    // =====================================================
    // ADMIN - GET ALL RESET REQUESTS
    // =====================================================

    public List<PasswordResetRequest>
    getAllPasswordResetRequests() {

        return passwordResetRequestRepository
                .findAllByOrderByRequestIdDesc();
    }

    // =====================================================
    // ADMIN - APPROVE PASSWORD RESET REQUEST
    // =====================================================

    @Transactional
    public PasswordResetRequest
    approvePasswordResetRequest(
            Integer requestId) {

        PasswordResetRequest request =
                passwordResetRequestRepository
                        .findById(requestId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Reset request not found"
                                )
                        );

        // -------------------------------------------------
        // CHECK CURRENT STATUS
        // -------------------------------------------------

        if ("COMPLETED".equalsIgnoreCase(
                request.getStatus())) {

            throw new RuntimeException(
                    "This reset request is already completed"
            );
        }

        if ("REJECTED".equalsIgnoreCase(
                request.getStatus())) {

            throw new RuntimeException(
                    "Rejected request cannot be approved"
            );
        }

        // -------------------------------------------------
        // APPROVE
        // -------------------------------------------------

        request.setStatus("APPROVED");

        request.setReviewedAt(
                LocalDateTime.now()
        );

        return passwordResetRequestRepository
                .save(request);
    }

    // =====================================================
    // ADMIN - REJECT PASSWORD RESET REQUEST
    // =====================================================

    @Transactional
    public PasswordResetRequest
    rejectPasswordResetRequest(
            Integer requestId) {

        PasswordResetRequest request =
                passwordResetRequestRepository
                        .findById(requestId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Reset request not found"
                                )
                        );

        // -------------------------------------------------
        // CHECK CURRENT STATUS
        // -------------------------------------------------

        if ("COMPLETED".equalsIgnoreCase(
                request.getStatus())) {

            throw new RuntimeException(
                    "Completed request cannot be rejected"
            );
        }

        // -------------------------------------------------
        // REJECT
        // -------------------------------------------------

        request.setStatus("REJECTED");

        request.setReviewedAt(
                LocalDateTime.now()
        );

        return passwordResetRequestRepository
                .save(request);
    }

    // =====================================================
    // USER - RESET PASSWORD AFTER ADMIN APPROVAL
    // =====================================================

    @Transactional
    public void resetPasswordByRequest(
            String email,
            String requestCode,
            String newPassword) {

        // -------------------------------------------------
        // VALIDATE EMAIL
        // -------------------------------------------------

        if (email == null || email.trim().isEmpty()) {
            throw new RuntimeException("Email is required");
        }

        // -------------------------------------------------
        // VALIDATE REQUEST CODE
        // -------------------------------------------------

        if (requestCode == null ||
                requestCode.trim().isEmpty()) {

            throw new RuntimeException(
                    "Request code is required"
            );
        }

        // -------------------------------------------------
        // VALIDATE PASSWORD
        // -------------------------------------------------

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

        String cleanEmail =
                email.trim().toLowerCase();

        String cleanRequestCode =
                requestCode.trim().toUpperCase();

        // -------------------------------------------------
        // FIND RESET REQUEST
        // -------------------------------------------------

        PasswordResetRequest request =
                passwordResetRequestRepository
                        .findByRequestCode(cleanRequestCode)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Invalid reset request code"
                                )
                        );

        // -------------------------------------------------
        // CHECK EMAIL
        // -------------------------------------------------

        if (!request.getEmail()
                .equalsIgnoreCase(cleanEmail)) {

            throw new RuntimeException(
                    "Invalid reset request"
            );
        }

        // -------------------------------------------------
        // CHECK APPROVAL
        // -------------------------------------------------

        if (!"APPROVED".equalsIgnoreCase(
                request.getStatus())) {

            if ("PENDING".equalsIgnoreCase(
                    request.getStatus())) {

                throw new RuntimeException(
                        "Your password reset request is still waiting for Admin approval"
                );
            }

            if ("REJECTED".equalsIgnoreCase(
                    request.getStatus())) {

                throw new RuntimeException(
                        "Your password reset request was rejected by Admin"
                );
            }

            throw new RuntimeException(
                    "Password reset is not available for this request"
            );
        }

        // -------------------------------------------------
        // FIND USER
        // -------------------------------------------------

        User user = userRepository
                .findByEmail(cleanEmail)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User account not found"
                        )
                );

        // -------------------------------------------------
        // UPDATE PASSWORD
        // -------------------------------------------------

        user.setPassword(newPassword);

        userRepository.save(user);

        // -------------------------------------------------
        // MARK REQUEST COMPLETED
        // -------------------------------------------------

        request.setStatus("COMPLETED");

        request.setReviewedAt(
                LocalDateTime.now()
        );

        passwordResetRequestRepository
                .save(request);
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