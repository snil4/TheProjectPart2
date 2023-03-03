package com.yiftach.TheProjectPart3.app.core.controllers;

import com.yiftach.TheProjectPart3.app.core.data.Category;
import com.yiftach.TheProjectPart3.app.core.data.Login;
import com.yiftach.TheProjectPart3.app.core.entities.Client;
import com.yiftach.TheProjectPart3.app.core.entities.Company;
import com.yiftach.TheProjectPart3.app.core.entities.Coupon;
import com.yiftach.TheProjectPart3.app.core.services.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/company")
@CrossOrigin
public class CompanyController extends ClientController {

    @Autowired
    private CompanyService companyService;

    @Override
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Login login) {
        try {
            return ResponseEntity.ok().body(companyService.login(login.getEmail(), login.getPassword()));
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @PostMapping(path = "/coupon", headers = { HttpHeaders.AUTHORIZATION })
    public ResponseEntity<Coupon> addCoupon(@RequestBody Coupon coupon, HttpServletRequest request) {
        try {
            Client client = (Client) request.getAttribute("client");
            return ResponseEntity.ok().body(companyService.addCoupon(coupon, client.getId()));
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @PutMapping(path = "/coupon", headers = { HttpHeaders.AUTHORIZATION })
    public ResponseEntity<Coupon> updateCoupon(@RequestBody Coupon coupon, HttpServletRequest request) {
        try {
            Client client = (Client) request.getAttribute("client");
            return ResponseEntity.ok().body(companyService.updateCoupon(coupon, client.getId()));
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @DeleteMapping(path = "/coupon/{couponId}", headers = { HttpHeaders.AUTHORIZATION })
    public ResponseEntity<String> deleteCoupon(@PathVariable int couponId, HttpServletRequest request) {
        try {
            Client client = (Client) request.getAttribute("client");
            companyService.deleteCoupon(couponId, client.getId());
            return ResponseEntity.ok().body(String.format("Coupon %s deleted",couponId));
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @GetMapping(path = "/coupon", headers = { HttpHeaders.AUTHORIZATION })
    public ResponseEntity<List<Coupon>> getCompanyCoupons(@PathVariable(required = false) Category category, @PathVariable(required = false) Optional<Double> maxPrice, HttpServletRequest request) {
        try {
            Client client = (Client) request.getAttribute("client");
            if (maxPrice.isPresent() && maxPrice.get() > 0) {
                if (category != null) {
                    return ResponseEntity.ok().body(companyService.getCompanyCoupons(category, maxPrice.get(), client.getId()));
                }
                return ResponseEntity.ok().body(companyService.getCompanyCoupons(maxPrice.get(), client.getId()));
            } else if (category != null) {
                return ResponseEntity.ok().body(companyService.getCompanyCoupons(category, client.getId()));
            }
            return ResponseEntity.ok().body(companyService.getCompanyCoupons(client.getId()));
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @GetMapping(path = "/coupon/{couponId}", headers = {HttpHeaders.AUTHORIZATION})
    public ResponseEntity<Coupon> getOneCoupon(@PathVariable int couponId, HttpServletRequest request) {
        try {
            Client client = (Client) request.getAttribute("client");
            return ResponseEntity.ok().body(companyService.getOneCoupon(couponId, client.getId()));
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @GetMapping(path = "", headers = { HttpHeaders.AUTHORIZATION })
    public ResponseEntity<Company> getCompanyDetails(HttpServletRequest request) {
        try {
            Client client = (Client) request.getAttribute("client");
            return ResponseEntity.ok().body(companyService.getCompanyDetails(client.getId()));
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }
}
