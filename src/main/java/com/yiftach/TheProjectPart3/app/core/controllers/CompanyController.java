package com.yiftach.TheProjectPart3.app.core.controllers;

import com.yiftach.TheProjectPart3.app.core.data.Category;
import com.yiftach.TheProjectPart3.app.core.entities.Company;
import com.yiftach.TheProjectPart3.app.core.entities.Coupon;
import com.yiftach.TheProjectPart3.app.core.services.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/company")
public class CompanyController {

    @Autowired
    private CompanyService companyService;

    @PostMapping("/coupon")
    public ResponseEntity<Coupon> addCoupon(Coupon coupon) {
        try {
            return ResponseEntity.ok().body(companyService.addCoupon(coupon));
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/coupon")
    public ResponseEntity<Coupon> updateCoupon(Coupon coupon) {
        try {
            return ResponseEntity.ok().body(companyService.updateCoupon(coupon));
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/coupon")
    public ResponseEntity<String> deleteCoupon(int couponId) {
        try {
            companyService.deleteCoupon(couponId);
            return ResponseEntity.ok().body(String.format("Coupon %s deleted",couponId));
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/coupon")
    public ResponseEntity<List<Coupon>> getCompanyCoupons(Category category,double maxPrice) {
        try {
            if (maxPrice > 0) {
                if (category != null) {
                    return ResponseEntity.ok().body(companyService.getCompanyCoupons(category, maxPrice));
                }
                return ResponseEntity.ok().body(companyService.getCompanyCoupons(maxPrice));
            } else if (category != null) {
                return ResponseEntity.ok().body(companyService.getCompanyCoupons(category));
            }
            return ResponseEntity.ok().body(companyService.getCompanyCoupons());
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("")
    public ResponseEntity<Company> getCompanyDetails() {
        try {
            return ResponseEntity.ok().body(companyService.getCompanyDetails());
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }

}
