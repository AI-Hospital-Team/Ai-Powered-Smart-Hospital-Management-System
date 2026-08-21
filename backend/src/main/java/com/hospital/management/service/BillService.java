package com.hospital.management.service;

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

    public Bill createBill(Bill bill) {

        if (bill.getStatus() == null ||
                bill.getStatus().isBlank()) {

            bill.setStatus("Pending");
        }

        return billRepository.save(bill);
    }

    public List<Bill> getAllBills() {
        return billRepository.findAll();
    }

    public List<Bill> getBillsByPatient(Integer patientId) {
        return billRepository.findByPatientId(patientId);
    }

    public List<Bill> getBillsByDoctor(Integer doctorId) {
        return billRepository.findByDoctorId(doctorId);
    }

    public Bill getBillById(Integer billId) {

        return billRepository.findById(billId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Bill not found with ID: " + billId
                        )
                );
    }

    public Bill updateBillStatus(
            Integer billId,
            String status) {

        Bill bill = getBillById(billId);

        bill.setStatus(status);

        return billRepository.save(bill);
    }
}