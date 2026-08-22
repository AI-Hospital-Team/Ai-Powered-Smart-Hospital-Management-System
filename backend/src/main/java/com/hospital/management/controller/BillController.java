package com.hospital.management.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hospital.management.entity.Bill;
import com.hospital.management.service.BillService;

@RestController
@RequestMapping("/api/bills")
@CrossOrigin(origins = "http://localhost:5173")
public class BillController {

    private final BillService billService;

    public BillController(BillService billService) {
        this.billService = billService;
    }

    @PostMapping
    public ResponseEntity<Bill> createBill(@RequestBody Bill bill) {
        Bill savedBill = billService.createBill(bill);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(savedBill);
    }

    @GetMapping
    public ResponseEntity<List<Bill>> getAllBills() {
        return ResponseEntity.ok(
                billService.getAllBills()
        );
    }

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<Bill>> getBillsByPatient(
            @PathVariable Integer patientId) {

        return ResponseEntity.ok(
                billService.getBillsByPatient(patientId)
        );
    }

    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<List<Bill>> getBillsByDoctor(
            @PathVariable Integer doctorId) {

        return ResponseEntity.ok(
                billService.getBillsByDoctor(doctorId)
        );
    }

    @GetMapping("/{billId}")
    public ResponseEntity<Bill> getBillById(
            @PathVariable Integer billId) {

        return ResponseEntity.ok(
                billService.getBillById(billId)
        );
    }

    @PutMapping("/{billId}/status")
    public ResponseEntity<Bill> updateBillStatus(
            @PathVariable Integer billId,
            @RequestBody Map<String, String> request) {

        String status = request.get("status");

        if (status == null || status.isBlank()) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(
                billService.updateBillStatus(
                        billId,
                        status
                )
        );
    }
}