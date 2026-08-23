package com.hospital.management.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.hospital.management.entity.Bill;
import com.hospital.management.repository.BillRepository;

@Service
public class BillService {

    private final BillRepository billRepository;

    public BillService(BillRepository billRepository) {
        this.billRepository = billRepository;
    }

    // ==========================================
    // CREATE BILL
    // ==========================================

    public Bill createBill(Bill bill) {

        if (bill.getBillDate() == null) {
            bill.setBillDate(LocalDate.now());
        }

        if (bill.getStatus() == null ||
                bill.getStatus().isBlank()) {

            bill.setStatus("Pending");
        }

        return billRepository.save(bill);
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

        return billRepository.save(
                existingBill
        );
    }

    // ==========================================
    // UPDATE BILL STATUS
    // ==========================================

    public Bill updateBillStatus(
            Integer billId,
            String status) {

        Bill bill =
                getBillById(billId);

        bill.setStatus(status);

        return billRepository.save(bill);
    }
}