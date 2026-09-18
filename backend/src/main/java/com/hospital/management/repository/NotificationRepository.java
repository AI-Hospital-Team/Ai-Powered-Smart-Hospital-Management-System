package com.hospital.management.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hospital.management.entity.Notification;

public interface NotificationRepository
        extends JpaRepository<Notification, Integer> {

    List<Notification> findByUserIdOrderByCreatedAtDesc(
            Integer userId
    );

    boolean existsByUserIdAndTypeAndReferenceId(
            Integer userId,
            String type,
            Integer referenceId
    );

    long countByUserIdAndReadFalse(
            Integer userId
    );
}