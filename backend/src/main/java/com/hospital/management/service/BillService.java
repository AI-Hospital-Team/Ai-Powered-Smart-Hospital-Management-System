package com.hospital.management.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.hospital.management.entity.Bill;
import com.hospital.management.repository.BillRepository;

@Service
public class BillService {

    private final BillRepository billRepository;
    private final NotificationService notificationService;

    public BillService(
            BillRepository billRepository,
            NotificationService notificationService) {

        this.billRepository = billRepository;
        this.notificationService = notificationService;
    }

    // ==========================================
    // CREATE BILL
    // ==========================================

    public Bill createBill(Bill bill) {

        if (bill.getBillDate() == null) {

            bill.setBillDate(
                    LocalDate.now()
            );
        }

        if (bill.getStatus() == null ||
                bill.getStatus().isBlank()) {

            bill.setStatus("Pending");
        }

        Bill savedBill =
                billRepository.save(bill);

        // ==========================================
        // PENDING BILL NOTIFICATION
        // ==========================================

        if ("Pending".equalsIgnoreCase(
                savedBill.getStatus())) {

            notificationService.createNotification(
                    savedBill.getPatientId(),
                    "PATIENT",
                    "Pending Bill",
                    "You have a pending bill of ₹"
                            + savedBill.getAmount()
                            + ".",
                    "BILL_PENDING",
                    savedBill.getBillId()
            );
        }

        return savedBill;
    }

    // ==========================================
    // GET ALL BILLS
    // ==========================================

    public List<Bill> getAllBills() {

        return billRepository.findAll();
    }

    // ==========================================
    // GET BILLS BY PATIENT
    // ==========================================

    public List<Bill> getBillsByPatient(
            Integer patientId) {

        return billRepository.findByPatientId(
                patientId
        );
    }

    // ==========================================
    // GET BILLS BY DOCTOR
    // ==========================================

    public List<Bill> getBillsByDoctor(
            Integer doctorId) {

        return billRepository.findByDoctorId(
                doctorId
        );
    }

    // ==========================================
    // GET BILL BY ID
    // ==========================================

    public Bill getBillById(
            Integer billId) {

        return billRepository.findById(
                billId
        ).orElseThrow(
                () -> new RuntimeException(
                        "Bill not found with ID: "
                                + billId
                )
        );
    }

    // ==========================================
    // UPDATE BILL
    // ==========================================

    public Bill updateBill(
            Integer billId,
            Bill updatedBill) {

        Bill existingBill =
                getBillById(billId);

        existingBill.setPatientId(
                updatedBill.getPatientId()
        );

        existingBill.setPatientName(
                updatedBill.getPatientName()
        );

        existingBill.setDoctorId(
                updatedBill.getDoctorId()
        );

        existingBill.setBillType(
                updatedBill.getBillType()
        );

        existingBill.setAmount(
                updatedBill.getAmount()
        );

        existingBill.setDescription(
                updatedBill.getDescription()
        );

        if (updatedBill.getStatus() != null &&
                !updatedBill.getStatus().isBlank()) {

            existingBill.setStatus(
                    updatedBill.getStatus()
            );
        }

        if (updatedBill.getBillDate() != null) {

            existingBill.setBillDate(
                    updatedBill.getBillDate()
            );
        }

        Bill savedBill =
                billRepository.save(
                        existingBill
                );

        // ==========================================
        // PENDING BILL NOTIFICATION
        // ==========================================

        if ("Pending".equalsIgnoreCase(
                savedBill.getStatus())) {

            notificationService.createNotification(
                    savedBill.getPatientId(),
                    "PATIENT",
                    "Pending Bill",
                    "You have a pending bill of ₹"
                            + savedBill.getAmount()
                            + ".",
                    "BILL_PENDING",
                    savedBill.getBillId()
            );
        }

        return savedBill;
    }

    // ==========================================
    // UPDATE BILL STATUS
    // ==========================================

    public Bill updateBillStatus(
            Integer billId,
            String status) {

        Bill bill =
                getBillById(billId);

        if (status == null ||
                status.isBlank()) {

            throw new RuntimeException(
                    "Bill status is required."
            );
        }

        bill.setStatus(status);

        Bill updatedBill =
                billRepository.save(bill);

        // ==========================================
        // BILL PAID NOTIFICATION
        // ==========================================

        if ("Paid".equalsIgnoreCase(status)) {

            notificationService.createNotification(
                    bill.getPatientId(),
                    "PATIENT",
                    "Bill Paid",
                    "Your bill of ₹"
                            + bill.getAmount()
                            + " has been marked as paid.",
                    "BILL_PAID",
                    bill.getBillId()
            );
        }

        // ==========================================
        // BILL PENDING NOTIFICATION
        // ==========================================

        if ("Pending".equalsIgnoreCase(status)) {

            notificationService.createNotification(
                    bill.getPatientId(),
                    "PATIENT",
                    "Pending Bill",
                    "You have a pending bill of ₹"
                            + bill.getAmount()
                            + ".",
                    "BILL_PENDING",
                    bill.getBillId()
            );
        }

        return updatedBill;
    }
}