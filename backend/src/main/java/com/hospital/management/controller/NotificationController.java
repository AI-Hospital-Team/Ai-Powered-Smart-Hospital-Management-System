package com.hospital.management.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hospital.management.entity.Notification;
import com.hospital.management.service.NotificationService;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins = "http://localhost:5173")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(
            NotificationService notificationService) {

        this.notificationService = notificationService;
    }

    // =====================================================
    // GET USER NOTIFICATIONS
    // =====================================================

    @GetMapping("/{userId}")
    public ResponseEntity<List<Notification>>
    getNotifications(
            @PathVariable Integer userId) {

        return ResponseEntity.ok(
                notificationService
                        .getNotifications(userId)
        );
    }

    // =====================================================
    // MARK ONE AS READ
    // =====================================================

    @PutMapping("/{notificationId}/read")
    public ResponseEntity<Notification>
    markAsRead(
            @PathVariable Integer notificationId) {

        return ResponseEntity.ok(
                notificationService
                        .markAsRead(notificationId)
        );
    }

    // =====================================================
    // MARK ALL AS READ
    // =====================================================

    @PutMapping("/user/{userId}/read-all")
    public ResponseEntity<String>
    markAllAsRead(
            @PathVariable Integer userId) {

        notificationService
                .markAllAsRead(userId);

        return ResponseEntity.ok(
                "All notifications marked as read."
        );
    }

    // =====================================================
    // UNREAD COUNT
    // =====================================================

    @GetMapping("/{userId}/unread-count")
    public ResponseEntity<Long>
    getUnreadCount(
            @PathVariable Integer userId) {

        return ResponseEntity.ok(
                notificationService
                        .getUnreadCount(userId)
        );
    }

    // =====================================================
    // DELETE
    // =====================================================

    @DeleteMapping("/{notificationId}")
    public ResponseEntity<String>
    deleteNotification(
            @PathVariable Integer notificationId) {

        notificationService
                .deleteNotification(notificationId);

        return ResponseEntity.ok(
                "Notification deleted successfully."
        );
    }
}