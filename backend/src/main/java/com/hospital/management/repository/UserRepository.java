package com.hospital.management.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hospital.management.entity.User;

public interface UserRepository
        extends JpaRepository<User, Integer> {

    Optional<User> findByEmail(String email);

    Optional<User> findByDoctorId(Integer doctorId);

    List<User> findByRoleIgnoreCase(String role);
}