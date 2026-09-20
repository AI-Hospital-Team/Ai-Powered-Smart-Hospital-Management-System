package com.hospital.management.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendOtpEmail(String email, String otp) {

        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(email);
        message.setSubject("AI Smart Hospital - Password Reset OTP");

        message.setText(
                "Hello,\n\n"
                + "We received a request to reset your password for the AI-Powered Smart Hospital Management System.\n\n"
                + "Your Password Reset OTP is:\n\n"
                + otp
                + "\n\n"
                + "This OTP is valid for 5 minutes.\n\n"
                + "If you did not request a password reset, please ignore this email.\n\n"
                + "Regards,\n"
                + "AI-Powered Smart Hospital Management System"
        );

        mailSender.send(message);
    }
}