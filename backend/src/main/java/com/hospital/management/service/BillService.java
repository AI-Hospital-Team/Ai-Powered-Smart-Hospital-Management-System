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

    public List<Bill> getBillsByPatientId(Integer patientId) {
        return billRepository.findByPatientId(patientId);
    }

    public List<Bill> getAllBills() {
        return billRepository.findAll();
    }
}