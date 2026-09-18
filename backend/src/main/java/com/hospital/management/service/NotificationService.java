package com.hospital.management.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.hospital.management.entity.Notification;
import com.hospital.management.repository.NotificationRepository;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;

    public NotificationService(
            NotificationRepository notificationRepository) {

        this.notificationRepository = notificationRepository;
    }

    // =====================================================
    // CREATE NOTIFICATION
    // =====================================================

    public Notification createNotification(
            Integer userId,
            String role,
            String title,
            String message,
            String type,
            Integer referenceId) {

        // Prevent duplicate notification
        if (referenceId != null &&
                notificationRepository
                        .existsByUserIdAndTypeAndReferenceId(
                                userId,
                                type,
                                referenceId
                        )) {

            return null;
        }

        Notification notification = new Notification();

        notification.setUserId(userId);
        notification.setRole(role);
        notification.setTitle(title);
        notification.setMessage(message);
        notification.setType(type);
        notification.setReferenceId(referenceId);
        notification.setRead(false);
        notification.setCreatedAt(LocalDateTime.now());

        return notificationRepository.save(notification);
    }

    // =====================================================
    // GET USER NOTIFICATIONS
    // =====================================================

    public List<Notification> getNotifications(
            Integer userId) {

        return notificationRepository
                .findByUserIdOrderByCreatedAtDesc(userId);
    }

    // =====================================================
    // MARK AS READ
    // =====================================================

    public Notification markAsRead(
            Integer notificationId) {

        Notification notification =
                notificationRepository
                        .findById(notificationId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Notification not found with ID: "
                                                + notificationId
                                )
                        );

        notification.setRead(true);

        return notificationRepository.save(notification);
    }

    // =====================================================
    // MARK ALL AS READ
    // =====================================================

    public void markAllAsRead(
            Integer userId) {

        List<Notification> notifications =
                notificationRepository
                        .findByUserIdOrderByCreatedAtDesc(userId);

        for (Notification notification : notifications) {

            notification.setRead(true);
        }

        notificationRepository.saveAll(notifications);
    }

    // =====================================================
    // DELETE
    // =====================================================

    public void deleteNotification(
            Integer notificationId) {

        if (!notificationRepository
                .existsById(notificationId)) {

            throw new RuntimeException(
                    "Notification not found with ID: "
                            + notificationId
            );
        }

        notificationRepository.deleteById(notificationId);
    }

    // =====================================================
    // UNREAD COUNT
    // =====================================================

    public long getUnreadCount(
            Integer userId) {

        return notificationRepository
                .countByUserIdAndReadFalse(userId);
    }
}