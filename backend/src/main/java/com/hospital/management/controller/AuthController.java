package com.hospital.management.controller;

import com.hospital.management.entity.User;
import com.hospital.management.service.AuthService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public User login(@RequestBody LoginRequest request) {
        return authService.login(
                request.email(),
                request.password(),
                request.role()
        );
    }

    public record LoginRequest(
            String email,
            String password,
            String role
    ) {
    }
}