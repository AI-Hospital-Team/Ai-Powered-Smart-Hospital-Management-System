package com.hospital.management.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hospital.management.entity.Appointment;

public interface AppointmentRepository extends JpaRepository<Appointment, Integer> {
}
