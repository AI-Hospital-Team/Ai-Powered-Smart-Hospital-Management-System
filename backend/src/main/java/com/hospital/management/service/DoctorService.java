package com.hospital.management.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hospital.management.entity.Doctor;
import com.hospital.management.entity.User;
import com.hospital.management.repository.DoctorRepository;
import com.hospital.management.repository.UserRepository;

@Service
public class DoctorService {

    private final DoctorRepository doctorRepository;
    private final UserRepository userRepository;
    private final DoctorApprovalLogService doctorApprovalLogService;

    // =========================================================
    // CONSTRUCTOR
    // =========================================================

    public DoctorService(
            DoctorRepository doctorRepository,
            UserRepository userRepository,
            DoctorApprovalLogService doctorApprovalLogService) {

        this.doctorRepository = doctorRepository;
        this.userRepository = userRepository;
        this.doctorApprovalLogService = doctorApprovalLogService;
    }

    // =========================================================
    // GET ALL DOCTORS
    // =========================================================

    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    // =========================================================
    // GET DOCTOR BY ID
    // =========================================================

    public Doctor getDoctorById(Integer doctorId) {

        return doctorRepository.findById(doctorId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Doctor not found with ID: "
                                        + doctorId
                        )
                );
    }

    // =========================================================
    // GET DOCTORS BY SHIFT
    // DAY / NIGHT
    // =========================================================

    public List<Doctor> getDoctorsByShift(String shift) {

        if (shift == null || shift.trim().isEmpty()) {
            throw new RuntimeException(
                    "Shift cannot be empty"
            );
        }

        return doctorRepository
                .findByShiftIgnoreCase(shift.trim());
    }

    // =========================================================
    // CREATE DOCTOR
    // =========================================================

    @Transactional
    public Doctor createDoctor(Doctor doctor) {

        if (doctor == null) {
            throw new RuntimeException(
                    "Doctor data cannot be null"
            );
        }

        if (doctor.getStatus() == null ||
                doctor.getStatus().trim().isEmpty()) {

            doctor.setStatus("PENDING");
        }

        if (doctor.getShift() == null ||
                doctor.getShift().trim().isEmpty()) {

            doctor.setShift("DAY");
        }

        doctor.setShift(
                doctor.getShift()
                        .trim()
                        .toUpperCase()
        );

        return doctorRepository.save(doctor);
    }

    // =========================================================
    // CREATE DOCTOR ACCOUNT
    // Used when Admin creates doctor directly
    // =========================================================

    @Transactional
    public Doctor createDoctorAccount(
            Doctor doctor,
            String email,
            String password) {

        if (doctor == null) {
            throw new RuntimeException(
                    "Doctor data cannot be null"
            );
        }

        if (email == null ||
                email.trim().isEmpty()) {

            throw new RuntimeException(
                    "Doctor email is required"
            );
        }

        if (password == null ||
                password.trim().isEmpty()) {

            throw new RuntimeException(
                    "Doctor password is required"
            );
        }

        String doctorEmail =
                email.trim().toLowerCase();

        // -----------------------------------------
        // Check duplicate email
        // -----------------------------------------

        if (userRepository.findByEmail(doctorEmail)
                .isPresent()) {

            throw new RuntimeException(
                    "Email already exists"
            );
        }

        // -----------------------------------------
        // Default values
        // -----------------------------------------

        doctor.setStatus("APPROVED");

        if (doctor.getShift() == null ||
                doctor.getShift().trim().isEmpty()) {

            doctor.setShift("DAY");
        }

        doctor.setShift(
                doctor.getShift()
                        .trim()
                        .toUpperCase()
        );

        // -----------------------------------------
        // Save doctor
        // -----------------------------------------

        Doctor savedDoctor =
                doctorRepository.save(doctor);

        // -----------------------------------------
        // Create login user
        // -----------------------------------------

        User user = new User();

        user.setEmail(doctorEmail);
        user.setPassword(password);
        user.setRole("Doctor");
        user.setStatus("ACTIVE");
        user.setDoctorId(
                savedDoctor.getDoctorId()
        );

        userRepository.save(user);

        return savedDoctor;
    }

    // =========================================================
    // APPROVE DOCTOR
    //
    // Doctor status -> APPROVED
    // User status   -> ACTIVE
    // Log           -> APPROVED
    // =========================================================

    @Transactional
    public Doctor approveDoctor(Integer doctorId) {

        // -----------------------------------------
        // Find doctor
        // -----------------------------------------

        Doctor doctor =
                getDoctorById(doctorId);

        // -----------------------------------------
        // Approve doctor
        // -----------------------------------------

        doctor.setStatus("APPROVED");

        Doctor savedDoctor =
                doctorRepository.save(doctor);

        // -----------------------------------------
        // Find login account
        // -----------------------------------------

        User user = userRepository
                .findByDoctorId(doctorId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Doctor login account not found"
                        )
                );

        // -----------------------------------------
        // Activate login
        // -----------------------------------------

        user.setStatus("ACTIVE");

        userRepository.save(user);

        // -----------------------------------------
        // CREATE APPROVAL LOG
        // -----------------------------------------

        doctorApprovalLogService.createLog(
                savedDoctor,
                "APPROVED"
        );

        return savedDoctor;
    }

    // =========================================================
    // REJECT DOCTOR
    //
    // Doctor status -> REJECTED
    // User status   -> REJECTED
    // Log           -> REJECTED
    // =========================================================

    @Transactional
    public Doctor rejectDoctor(Integer doctorId) {

        // -----------------------------------------
        // Find doctor
        // -----------------------------------------

        Doctor doctor =
                getDoctorById(doctorId);

        // -----------------------------------------
        // Reject doctor
        // -----------------------------------------

        doctor.setStatus("REJECTED");

        Doctor savedDoctor =
                doctorRepository.save(doctor);

        // -----------------------------------------
        // Find login account
        // -----------------------------------------

        User user = userRepository
                .findByDoctorId(doctorId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Doctor login account not found"
                        )
                );

        // -----------------------------------------
        // Disable login
        // -----------------------------------------

        user.setStatus("REJECTED");

        userRepository.save(user);

        // -----------------------------------------
        // CREATE REJECTION LOG
        // -----------------------------------------

        doctorApprovalLogService.createLog(
                savedDoctor,
                "REJECTED"
        );

        return savedDoctor;
    }

    // =========================================================
    // UPDATE DOCTOR
    // =========================================================

    @Transactional
    public Doctor updateDoctor(
            Integer doctorId,
            Doctor updatedDoctor) {

        Doctor existingDoctor =
                getDoctorById(doctorId);

        if (updatedDoctor == null) {
            throw new RuntimeException(
                    "Doctor data cannot be null"
            );
        }

        // -----------------------------------------
        // Name
        // -----------------------------------------

        if (updatedDoctor.getName() != null) {

            existingDoctor.setName(
                    updatedDoctor.getName()
            );
        }

        // -----------------------------------------
        // Specialization
        // -----------------------------------------

        if (updatedDoctor.getSpecialization() != null) {

            existingDoctor.setSpecialization(
                    updatedDoctor.getSpecialization()
            );
        }

        // -----------------------------------------
        // DOB
        // -----------------------------------------

        if (updatedDoctor.getDob() != null) {

            existingDoctor.setDob(
                    updatedDoctor.getDob()
            );
        }

        // -----------------------------------------
        // Gender
        // -----------------------------------------

        if (updatedDoctor.getGender() != null) {

            existingDoctor.setGender(
                    updatedDoctor.getGender()
            );
        }

        // -----------------------------------------
        // Phone
        // -----------------------------------------

        if (updatedDoctor.getPhone() != null) {

            existingDoctor.setPhone(
                    updatedDoctor.getPhone()
            );
        }

        // -----------------------------------------
        // Email
        // -----------------------------------------

        if (updatedDoctor.getEmail() != null) {

            existingDoctor.setEmail(
                    updatedDoctor.getEmail()
            );
        }

        // -----------------------------------------
        // Address
        // -----------------------------------------

        if (updatedDoctor.getAddress() != null) {

            existingDoctor.setAddress(
                    updatedDoctor.getAddress()
            );
        }

        // -----------------------------------------
        // Qualification
        // -----------------------------------------

        if (updatedDoctor.getQualification() != null) {

            existingDoctor.setQualification(
                    updatedDoctor.getQualification()
            );
        }

        // -----------------------------------------
        // Medical Registration Number
        // -----------------------------------------

        if (updatedDoctor
                .getMedicalRegistrationNo() != null) {

            existingDoctor
                    .setMedicalRegistrationNo(
                            updatedDoctor
                                    .getMedicalRegistrationNo()
                    );
        }

        // -----------------------------------------
        // Hospital Association
        // -----------------------------------------

        if (updatedDoctor
                .getHospitalAssociation() != null) {

            existingDoctor
                    .setHospitalAssociation(
                            updatedDoctor
                                    .getHospitalAssociation()
                    );
        }

        // -----------------------------------------
        // Shift
        // -----------------------------------------

        if (updatedDoctor.getShift() != null &&
                !updatedDoctor.getShift()
                        .trim()
                        .isEmpty()) {

            existingDoctor.setShift(
                    updatedDoctor.getShift()
                            .trim()
                            .toUpperCase()
            );
        }

        // -----------------------------------------
        // Status
        // -----------------------------------------

        if (updatedDoctor.getStatus() != null &&
                !updatedDoctor.getStatus()
                        .trim()
                        .isEmpty()) {

            existingDoctor.setStatus(
                    updatedDoctor.getStatus()
                            .trim()
                            .toUpperCase()
            );
        }

        return doctorRepository.save(
                existingDoctor
        );
    }

    // =========================================================
    // DELETE DOCTOR
    // =========================================================

    @Transactional
    public void deleteDoctor(Integer doctorId) {

        Doctor doctor =
                getDoctorById(doctorId);

        // -----------------------------------------
        // Delete linked user account if exists
        // -----------------------------------------

        userRepository
                .findByDoctorId(doctorId)
                .ifPresent(user ->
                        userRepository.delete(user)
                );

        // -----------------------------------------
        // Delete doctor
        // -----------------------------------------

        doctorRepository.delete(doctor);
    }
}