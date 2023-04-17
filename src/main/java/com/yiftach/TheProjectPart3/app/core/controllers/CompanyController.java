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
import javax.websocket.server.PathParam;
import java.util.List;

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
    public ResponseEntity<List<Coupon>> getCompanyCoupons(HttpServletRequest request) {
        try {
            Client client = (Client) request.getAttribute("client");
            return ResponseEntity.ok().body(companyService.getCompanyCoupons(client.getId()));
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @GetMapping(path = "/coupon/sorted", headers = { HttpHeaders.AUTHORIZATION })
    public ResponseEntity<List<Coupon>> getCompanyCouponsSorted(@PathParam("category") String category, @PathParam("maxPrice") Double maxPrice, HttpServletRequest request) {
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
                    return ResponseEntity.ok().body(companyService.getCompanyCoupons(cat, maxPrice, client.getId()));
                }
                return ResponseEntity.ok().body(companyService.getCompanyCoupons(maxPrice, client.getId()));
            } else if (cat != null) {
                return ResponseEntity.ok().body(companyService.getCompanyCoupons(cat, client.getId()));
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
