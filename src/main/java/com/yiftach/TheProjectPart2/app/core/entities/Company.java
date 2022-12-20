package com.yiftach.TheProjectPart2.app.core.entities;

import com.sun.istack.NotNull;
import com.yiftach.TheProjectPart2.app.core.exceptions.CouponSystemException;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @NotNull
    private String name;
    @NotNull
    private String email;
    @NotNull
    private String password;
    @OneToMany(mappedBy = "id", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<Coupon> coupons;

    public Company() {
    }

    public Company(int id, String name, String email, String password) {
        setId(id);
        setName(name);
        setEmail(email);
        setPassword(password);
    }

    @Override
    public String toString() {
        return "core.app.beans.Company{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                '}';
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Coupon> getCoupons() {
        return coupons;
    }

    public Coupon addCoupon(Coupon coupon) {
        if (coupons == null) {
            coupons = new ArrayList<>();
        }

        coupon.setCompany(this);
        coupons.add(coupon);

        return coupon;
    }

    public void updateCoupon(Coupon coupon) throws CouponSystemException {

        Coupon check = coupons.get(coupons.indexOf(coupon));
        if (check.getId() == coupon.getId()) {
            coupons.remove(check);
            coupons.add(coupon);
            return;
        }

        throw new CouponSystemException("Can't find coupon with ID " + coupon.getId() + " in the company");
    }

    public void removeCoupon(int couponId) throws CouponSystemException {

        //Coupon check = coupons.get(coupons.indexOf(coupon));
        for (Coupon check:coupons) {
            if (check.getId() == couponId) {
                coupons.remove(check);
                return;
            }
        }

        throw new CouponSystemException("Can't find coupon with ID " + couponId + " in the company");
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        Company company = (Company) o;
        return getId() == company.getId();
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId());
    }
}
