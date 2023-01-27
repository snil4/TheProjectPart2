package com.yiftach.TheProjectPart3.app.core.controllers;

import com.yiftach.TheProjectPart3.app.core.entities.Company;
import com.yiftach.TheProjectPart3.app.core.entities.Customer;
import com.yiftach.TheProjectPart3.app.core.services.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/company")
    public ResponseEntity<Company> addCompany(Company company){
        try {
            return ResponseEntity.ok().body(adminService.addCompany(company));
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/company")
    public ResponseEntity<Company> updateCompany(Company company) {
        try {
            return ResponseEntity.ok().body(adminService.updateCompany(company));
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/company")
    public ResponseEntity<String> deleteCompany(int companyId) {
        try {
            adminService.deleteCompany(companyId);
            return ResponseEntity.ok().body(String.format("Company %s deleted",companyId));
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/company/all")
    public ResponseEntity<List<Company>> getAllCompanies() {
        try {
            return ResponseEntity.ok().body(adminService.getAllCompanies());
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/company")
    public ResponseEntity<Company> getOneCompany(int companyId) {
        try {
            return ResponseEntity.ok().body(adminService.getOneCompany(companyId));
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/customer")
    public ResponseEntity<Customer> addCustomer(Customer customer) {
        try {
            return ResponseEntity.ok().body(adminService.addCustomer(customer));
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/customer")
    public ResponseEntity<Customer> updateCustomer(Customer customer) {
        try {
            return ResponseEntity.ok().body(adminService.updateCustomer(customer));
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/customer")
    public ResponseEntity<String> deleteCustomer(int customerId) {
        try {
            adminService.deleteCustomer(customerId);
            return ResponseEntity.ok().body(String.format("Customer %s deleted", customerId));
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/customer/all")
    public ResponseEntity<List<Customer>> getAllCustomers() {
        try {
            return ResponseEntity.ok().body(adminService.getAllCustomers());
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/customer")
    public ResponseEntity<Customer> getOneCustomer(int customerId) {
        try {
            return ResponseEntity.ok().body(adminService.getOneCustomer(customerId));
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }

}
