package com.yiftach.TheProjectPart3.app.core.controllers;

import com.yiftach.TheProjectPart3.app.core.data.Login;
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
@CrossOrigin
public class AdminController extends ClientController {

    @Autowired
    private AdminService adminService;

    @Override
    @PostMapping(path = "/login")
    public ResponseEntity<String> login(@RequestBody Login login) {
        try {
            return ResponseEntity.ok().body(adminService.login(login.getEmail(), login.getPassword()));
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @PostMapping(path = "/company", headers = { HttpHeaders.AUTHORIZATION })
    public ResponseEntity<Company> addCompany(@RequestBody Company company){
        try {
            return ResponseEntity.ok().body(adminService.addCompany(company));
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @PutMapping(path = "/company", headers = { HttpHeaders.AUTHORIZATION })
    public ResponseEntity<Company> updateCompany(@RequestBody Company company) {
        try {
            return ResponseEntity.ok().body(adminService.updateCompany(company));
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @DeleteMapping(path = "/company/{companyId}", headers = { HttpHeaders.AUTHORIZATION })
    public ResponseEntity<String> deleteCompany(@PathVariable int companyId) {
        try {
            adminService.deleteCompany(companyId);
            return ResponseEntity.ok().body(String.format("Company %s deleted",companyId));
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @GetMapping(path = "/company", headers = { HttpHeaders.AUTHORIZATION })
    public ResponseEntity<List<Company>> getAllCompanies() {
        try {
            return ResponseEntity.ok().body(adminService.getAllCompanies());
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @GetMapping(path = "/company/{companyId}", headers = { HttpHeaders.AUTHORIZATION })
    public ResponseEntity<Company> getOneCompany(@PathVariable int companyId) {
        try {
            return ResponseEntity.ok().body(adminService.getOneCompany(companyId));
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @PostMapping(path = "/customer", headers = { HttpHeaders.AUTHORIZATION })
    public ResponseEntity<Customer> addCustomer(@RequestBody Customer customer) {
        try {
            return ResponseEntity.ok().body(adminService.addCustomer(customer));
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @PutMapping(path = "/customer", headers = { HttpHeaders.AUTHORIZATION })
    public ResponseEntity<Customer> updateCustomer(@RequestBody Customer customer) {
        try {
            return ResponseEntity.ok().body(adminService.updateCustomer(customer));
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @DeleteMapping(path = "/customer/{customerId}", headers = { HttpHeaders.AUTHORIZATION })
    public ResponseEntity<String> deleteCustomer(@PathVariable int customerId) {
        try {
            adminService.deleteCustomer(customerId);
            return ResponseEntity.ok().body(String.format("Customer %s deleted", customerId));
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @GetMapping(path = "/customer", headers = { HttpHeaders.AUTHORIZATION })
    public ResponseEntity<List<Customer>> getAllCustomers() {
        try {
            return ResponseEntity.ok().body(adminService.getAllCustomers());
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @GetMapping(path = "/customer/{customerId}", headers = { HttpHeaders.AUTHORIZATION })
    public ResponseEntity<Customer> getOneCustomer(@PathVariable int customerId) {
        try {
            return ResponseEntity.ok().body(adminService.getOneCustomer(customerId));
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }
}
