package com.yiftach.TheProjectPart3.app.core.controllers;

import com.yiftach.TheProjectPart3.app.core.data.Category;
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

@RestController
@RequestMapping("/api/company")
public class CompanyController {

    @Autowired
    private CompanyService companyService;

    @PostMapping(path = "/coupon", headers = { HttpHeaders.AUTHORIZATION })
    public ResponseEntity<Coupon> addCoupon(Coupon coupon, HttpServletRequest request) {
        try {
            Client client = (Client) request.getAttribute("client");
            return ResponseEntity.ok().body(companyService.addCoupon(coupon, client.getClientId()));
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping(path = "/coupon", headers = { HttpHeaders.AUTHORIZATION })
    public ResponseEntity<Coupon> updateCoupon(Coupon coupon, HttpServletRequest request) {
        try {
            Client client = (Client) request.getAttribute("client");
            return ResponseEntity.ok().body(companyService.updateCoupon(coupon, client.getClientId()));
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping(path = "/coupon", headers = { HttpHeaders.AUTHORIZATION })
    public ResponseEntity<String> deleteCoupon(int couponId, HttpServletRequest request) {
        try {
            Client client = (Client) request.getAttribute("client");
            companyService.deleteCoupon(couponId, client.getClientId());
            return ResponseEntity.ok().body(String.format("Coupon %s deleted",couponId));
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(path = "/coupon", headers = { HttpHeaders.AUTHORIZATION })
    public ResponseEntity<List<Coupon>> getCompanyCoupons(Category category,double maxPrice, HttpServletRequest request) {
        try {
            Client client = (Client) request.getAttribute("client");
            if (maxPrice > 0) {
                if (category != null) {
                    return ResponseEntity.ok().body(companyService.getCompanyCoupons(category, maxPrice, client.getClientId()));
                }
                return ResponseEntity.ok().body(companyService.getCompanyCoupons(maxPrice, client.getClientId()));
            } else if (category != null) {
                return ResponseEntity.ok().body(companyService.getCompanyCoupons(category, client.getClientId()));
            }
            return ResponseEntity.ok().body(companyService.getCompanyCoupons(client.getClientId()));
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(path = "", headers = { HttpHeaders.AUTHORIZATION })
    public ResponseEntity<Company> getCompanyDetails(HttpServletRequest request) {
        try {
            Client client = (Client) request.getAttribute("client");
            return ResponseEntity.ok().body(companyService.getCompanyDetails(client.getClientId()));
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }
}
