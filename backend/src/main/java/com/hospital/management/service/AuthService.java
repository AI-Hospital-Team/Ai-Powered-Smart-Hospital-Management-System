package com.hospital.management.service;

import com.hospital.management.entity.User;
import com.hospital.management.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User login(String email, String password, String role) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!user.getPassword().equals(password)) {
            throw new RuntimeException("Invalid email or password");
        }

        if (!user.getRole().equalsIgnoreCase(role)) {
            throw new RuntimeException("Invalid role");
        }

        return user;
    }
}