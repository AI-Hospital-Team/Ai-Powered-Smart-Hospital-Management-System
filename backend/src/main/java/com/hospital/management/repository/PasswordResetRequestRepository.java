package com.hospital.management.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hospital.management.entity.PasswordResetRequest;

public interface PasswordResetRequestRepository
        extends JpaRepository<PasswordResetRequest, Integer> {

    Optional<PasswordResetRequest>
    findTopByEmailOrderByRequestIdDesc(String email);

    Optional<PasswordResetRequest>
    findByRequestCode(String requestCode);

    List<PasswordResetRequest>
    findAllByOrderByRequestIdDesc();
}