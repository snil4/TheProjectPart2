package com.yiftach.TheProjectPart3.app.core.controllers;

import com.yiftach.TheProjectPart3.app.core.data.Category;
import com.yiftach.TheProjectPart3.app.core.entities.Coupon;
import com.yiftach.TheProjectPart3.app.core.entities.Customer;
import com.yiftach.TheProjectPart3.app.core.services.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/customer")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @PostMapping("/coupon")
    public ResponseEntity<Coupon> purchaseCoupon(Coupon coupon){
        try {
            return ResponseEntity.ok().body(customerService.purchaseCoupon(coupon));
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/coupon/all")
    public ResponseEntity<List<Coupon>> getCustomerCoupons(double maxPrice, Category category){
        try {
            if (maxPrice > 0) {
                if (category != null) {
                    return ResponseEntity.ok().body(customerService.getCustomerCoupons(category,maxPrice));
                }
                return ResponseEntity.ok().body(customerService.getCustomerCoupons(maxPrice));
            } else if (category != null) {
                return ResponseEntity.ok().body(customerService.getCustomerCoupons(category));
            }
            return ResponseEntity.ok().body(customerService.getCustomerCoupons());
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("")
    public ResponseEntity<Customer> getCustomerDetails() {
        try {
            return ResponseEntity.ok().body(customerService.getCustomerDetails());
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }
}
