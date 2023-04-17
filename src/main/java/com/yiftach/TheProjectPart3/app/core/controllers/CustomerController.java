package com.yiftach.TheProjectPart3.app.core.controllers;

import com.yiftach.TheProjectPart3.app.core.data.Category;
import com.yiftach.TheProjectPart3.app.core.data.Login;
import com.yiftach.TheProjectPart3.app.core.entities.Client;
import com.yiftach.TheProjectPart3.app.core.entities.Coupon;
import com.yiftach.TheProjectPart3.app.core.entities.Customer;
import com.yiftach.TheProjectPart3.app.core.repositories.CouponRepo;
import com.yiftach.TheProjectPart3.app.core.services.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.http.HttpServletRequest;
import javax.websocket.server.PathParam;
import java.util.List;

@RestController
@RequestMapping("/api/customer")
@CrossOrigin
public class CustomerController extends ClientController {

    @Autowired
    private CustomerService customerService;
    @Autowired
    private CouponRepo couponRepo;

    @Override
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Login login) {
        try {
            return ResponseEntity.ok().body(customerService.login(login.getEmail(), login.getPassword()));
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @PostMapping(path = "/coupon/{couponId}", headers = { HttpHeaders.AUTHORIZATION })
    public ResponseEntity<Coupon> purchaseCoupon(@PathVariable String couponId, HttpServletRequest request){
        int id = Integer.parseInt(couponId);
        try {
            Client client = (Client) request.getAttribute("client");
            return ResponseEntity.ok().body(customerService.purchaseCoupon(id, client.getId()));
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @GetMapping(path = "/coupon", headers = { HttpHeaders.AUTHORIZATION })
    public ResponseEntity<List<Coupon>> getCustomerCoupons(HttpServletRequest request) {
        try {
            Client client = (Client) request.getAttribute("client");
            return ResponseEntity.ok().body(customerService.getCustomerCoupons(client.getId()));
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @GetMapping(path = "/coupon/sorted", headers = { HttpHeaders.AUTHORIZATION })
    public ResponseEntity<List<Coupon>> getCustomerCouponsSorted(@PathParam("category") String category, @PathParam("maxPrice") Double maxPrice, HttpServletRequest request) {
        Category cat;
        try {
            cat = Category.valueOf(category);
        } catch (IllegalArgumentException e) {
            cat = null;
        }
        try {
            Client client = (Client) request.getAttribute("client");
            if (maxPrice > 0) {
                if (cat != null) {
                    return ResponseEntity.ok().body(customerService.getCustomerCoupons(cat, maxPrice, client.getId()));
                }
                return ResponseEntity.ok().body(customerService.getCustomerCoupons(maxPrice, client.getId()));
            } else if (cat != null) {
                return ResponseEntity.ok().body(customerService.getCustomerCoupons(cat, client.getId()));
            }
            return ResponseEntity.ok().body(customerService.getCustomerCoupons(client.getId()));
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @GetMapping(path = "", headers = { HttpHeaders.AUTHORIZATION })
    public ResponseEntity<Customer> getCustomerDetails(HttpServletRequest request) {
        try {
            Client client = (Client) request.getAttribute("client");
            return ResponseEntity.ok().body(customerService.getCustomerDetails(client.getId()));
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @GetMapping(path = "/coupon/all", headers = { HttpHeaders.AUTHORIZATION })
    public ResponseEntity<List<Coupon>> getAllCoupons(HttpServletRequest request) {
        try {
            Client client = (Client) request.getAttribute("client");
            return ResponseEntity.ok().body(customerService.getAllCoupons(client.getId()));
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @GetMapping(path = "/coupon/{couponId}", headers = { HttpHeaders.AUTHORIZATION })
    public ResponseEntity<Coupon> getOneCoupon(@PathVariable int couponId, HttpServletRequest request) {
        try {
            Client client = (Client) request.getAttribute("client");
            return ResponseEntity.ok().body(customerService.getOneCoupon(couponId, client.getId()));
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }
}
