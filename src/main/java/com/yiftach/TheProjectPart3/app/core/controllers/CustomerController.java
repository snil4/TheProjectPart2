package com.yiftach.TheProjectPart3.app.core.controllers;

import com.yiftach.TheProjectPart3.app.core.data.Category;
import com.yiftach.TheProjectPart3.app.core.entities.Client;
import com.yiftach.TheProjectPart3.app.core.entities.Coupon;
import com.yiftach.TheProjectPart3.app.core.entities.Customer;
import com.yiftach.TheProjectPart3.app.core.services.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/api/customer")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @PostMapping(path = "/coupon", headers = { HttpHeaders.AUTHORIZATION })
    public ResponseEntity<Coupon> purchaseCoupon(Coupon coupon, HttpServletRequest request){
        try {
            Client client = (Client) request.getAttribute("client");
            return ResponseEntity.ok().body(customerService.purchaseCoupon(coupon, client.getClientId()));
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(path = "/coupon/all", headers = { HttpHeaders.AUTHORIZATION })
    public ResponseEntity<List<Coupon>> getCustomerCoupons(double maxPrice, Category category, HttpServletRequest request){
        try {
            Client client = (Client) request.getAttribute("client");
            if (maxPrice > 0) {
                if (category != null) {
                    return ResponseEntity.ok().body(customerService.getCustomerCoupons(category,maxPrice, client.getClientId()));
                }
                return ResponseEntity.ok().body(customerService.getCustomerCoupons(maxPrice, client.getClientId()));
            } else if (category != null) {
                return ResponseEntity.ok().body(customerService.getCustomerCoupons(category, client.getClientId()));
            }
            return ResponseEntity.ok().body(customerService.getCustomerCoupons(client.getClientId()));
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(path = "", headers = { HttpHeaders.AUTHORIZATION })
    public ResponseEntity<Customer> getCustomerDetails(HttpServletRequest request) {
        try {
            Client client = (Client) request.getAttribute("client");
            return ResponseEntity.ok().body(customerService.getCustomerDetails(client.getClientId()));
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }
}
