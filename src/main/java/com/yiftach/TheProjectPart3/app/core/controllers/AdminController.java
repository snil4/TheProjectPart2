package com.yiftach.TheProjectPart3.app.core.controllers;

import com.yiftach.TheProjectPart3.app.core.entities.Company;
import com.yiftach.TheProjectPart3.app.core.entities.Customer;
import com.yiftach.TheProjectPart3.app.core.services.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController extends ClientController {

    @Autowired
    private AdminService adminService;

    @Override
    public ResponseEntity<String> login(String email, String password) {
        try {
            return ResponseEntity.ok().body(adminService.login(email, password));
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping(path = "/company", headers = { HttpHeaders.AUTHORIZATION })
    public ResponseEntity<Company> addCompany(Company company){
        try {
            return ResponseEntity.ok().body(adminService.addCompany(company));
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping(path = "/company", headers = { HttpHeaders.AUTHORIZATION })
    public ResponseEntity<Company> updateCompany(Company company) {
        try {
            return ResponseEntity.ok().body(adminService.updateCompany(company));
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping(path = "/company", headers = { HttpHeaders.AUTHORIZATION })
    public ResponseEntity<String> deleteCompany(int companyId) {
        try {
            adminService.deleteCompany(companyId);
            return ResponseEntity.ok().body(String.format("Company %s deleted",companyId));
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(path = "/company/all", headers = { HttpHeaders.AUTHORIZATION })
    public ResponseEntity<List<Company>> getAllCompanies() {
        try {
            return ResponseEntity.ok().body(adminService.getAllCompanies());
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(path = "/company", headers = { HttpHeaders.AUTHORIZATION })
    public ResponseEntity<Company> getOneCompany(int companyId) {
        try {
            return ResponseEntity.ok().body(adminService.getOneCompany(companyId));
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping(path = "/customer", headers = { HttpHeaders.AUTHORIZATION })
    public ResponseEntity<Customer> addCustomer(Customer customer) {
        try {
            return ResponseEntity.ok().body(adminService.addCustomer(customer));
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping(path = "/customer", headers = { HttpHeaders.AUTHORIZATION })
    public ResponseEntity<Customer> updateCustomer(Customer customer) {
        try {
            return ResponseEntity.ok().body(adminService.updateCustomer(customer));
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping(path = "/customer", headers = { HttpHeaders.AUTHORIZATION })
    public ResponseEntity<String> deleteCustomer(int customerId) {
        try {
            adminService.deleteCustomer(customerId);
            return ResponseEntity.ok().body(String.format("Customer %s deleted", customerId));
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(path = "/customer/all", headers = { HttpHeaders.AUTHORIZATION })
    public ResponseEntity<List<Customer>> getAllCustomers() {
        try {
            return ResponseEntity.ok().body(adminService.getAllCustomers());
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(path = "/customer", headers = { HttpHeaders.AUTHORIZATION })
    public ResponseEntity<Customer> getOneCustomer(int customerId) {
        try {
            return ResponseEntity.ok().body(adminService.getOneCustomer(customerId));
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }
}
