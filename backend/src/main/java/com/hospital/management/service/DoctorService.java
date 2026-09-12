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

    public DoctorService(
            DoctorRepository doctorRepository,
            UserRepository userRepository) {

        this.doctorRepository = doctorRepository;
        this.userRepository = userRepository;
    }

    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    public Doctor getDoctorById(Integer doctorId) {
        return doctorRepository.findById(doctorId)
                .orElseThrow(() ->
                        new RuntimeException("Doctor not found"));
    }

    /*
     * Existing simple doctor creation.
     * Used for direct/admin doctor creation.
     */
    public Doctor createDoctor(Doctor doctor) {

        if (doctor.getStatus() == null ||
                doctor.getStatus().trim().isEmpty()) {

            doctor.setStatus("APPROVED");
        }

        return doctorRepository.save(doctor);
    }

    /*
     * Create doctor + login account together.
     *
     * This method is for ADMIN-created doctors,
     * so the account is active immediately.
     */
    @Transactional
    public Doctor createDoctorAccount(
            String name,
            String email,
            String password,
            String specialization) {

        if (name == null || name.trim().isEmpty()) {
            throw new RuntimeException("Doctor name is required");
        }

        if (email == null || email.trim().isEmpty()) {
            throw new RuntimeException("Email is required");
        }

        if (password == null || password.trim().isEmpty()) {
            throw new RuntimeException("Password is required");
        }

        if (specialization == null ||
                specialization.trim().isEmpty()) {

            throw new RuntimeException("Specialization is required");
        }

        String cleanName = name.trim();
        String cleanEmail = email.trim();
        String cleanSpecialization =
                specialization.trim();

        /*
         * Prevent duplicate login email.
         */
        if (userRepository.findByEmail(cleanEmail).isPresent()) {
            throw new RuntimeException("Email already registered");
        }

        /*
         * Create approved doctor profile.
         */
        Doctor doctor = new Doctor();

        doctor.setName(cleanName);
        doctor.setEmail(cleanEmail);
        doctor.setSpecialization(cleanSpecialization);
        doctor.setStatus("APPROVED");

        Doctor savedDoctor =
                doctorRepository.save(doctor);

        /*
         * Create active login account.
         */
        User user = new User();

        user.setEmail(cleanEmail);
        user.setPassword(password);
        user.setRole("Doctor");
        user.setStatus("ACTIVE");

        /*
         * Connect login account to doctor profile.
         */
        user.setDoctorId(
                savedDoctor.getDoctorId()
        );

        userRepository.save(user);

        return savedDoctor;
    }

    /*
     * Approve a pending doctor application.
     */
    @Transactional
    public Doctor approveDoctor(Integer doctorId) {

        Doctor doctor = getDoctorById(doctorId);

        doctor.setStatus("APPROVED");

        Doctor savedDoctor =
                doctorRepository.save(doctor);

        User user = userRepository
                .findByDoctorId(doctorId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Doctor login account not found"
                        ));

        user.setStatus("ACTIVE");

        userRepository.save(user);

        return savedDoctor;
    }

    /*
     * Reject a pending doctor application.
     */
    @Transactional
    public Doctor rejectDoctor(Integer doctorId) {

        Doctor doctor = getDoctorById(doctorId);

        doctor.setStatus("REJECTED");

        Doctor savedDoctor =
                doctorRepository.save(doctor);

        User user = userRepository
                .findByDoctorId(doctorId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Doctor login account not found"
                        ));

        user.setStatus("REJECTED");

        userRepository.save(user);

        return savedDoctor;
    }

    public Doctor updateDoctor(
            Integer doctorId,
            Doctor updatedDoctor) {

        Doctor doctor = getDoctorById(doctorId);

        doctor.setName(updatedDoctor.getName());

        doctor.setSpecialization(
                updatedDoctor.getSpecialization()
        );

        doctor.setPhone(
                updatedDoctor.getPhone()
        );

        doctor.setEmail(
                updatedDoctor.getEmail()
        );

        doctor.setQualification(
                updatedDoctor.getQualification()
        );

        doctor.setMedicalRegistrationNo(
                updatedDoctor.getMedicalRegistrationNo()
        );

        doctor.setHospitalAssociation(
                updatedDoctor.getHospitalAssociation()
        );

        return doctorRepository.save(doctor);
    }

    public void deleteDoctor(Integer doctorId) {

        Doctor doctor = getDoctorById(doctorId);

        doctorRepository.delete(doctor);
    }
}