package com.hospital.management.controller;

import com.hospital.management.entity.Bill;
import com.hospital.management.service.BillService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bills")
@CrossOrigin(origins = "http://localhost:5173")
public class BillController {

    private final BillService billService;

    public BillController(BillService billService) {
        this.billService = billService;
    }

    @GetMapping("/patient/{patientId}")
    public List<Bill> getBillsByPatientId(
            @PathVariable Integer patientId) {

        return billService.getBillsByPatientId(patientId);
    }

    @GetMapping
    public List<Bill> getAllBills() {
        return billService.getAllBills();
    }
}