package com.yiftach.TheProjectPart3.app.core.services;

import com.yiftach.TheProjectPart3.app.core.data.Category;
import com.yiftach.TheProjectPart3.app.core.entities.Coupon;
import com.yiftach.TheProjectPart3.app.core.entities.Customer;
import com.yiftach.TheProjectPart3.app.core.exceptions.CouponSystemException;
import com.yiftach.TheProjectPart3.app.core.repositories.CouponRepo;
import com.yiftach.TheProjectPart3.app.core.repositories.CustomerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

// TODO - make this work with the new authentication/authorization system
@Component
@Transactional
public class CustomerService extends AbstractService {

    @Autowired
    private CustomerRepo customerRepo;
    @Autowired
    private CouponRepo couponRepo;


    /**
     * @param coupon Coupon to add to the customer
     */
    public Coupon purchaseCoupon(Coupon coupon, int customerId) throws CouponSystemException {
        try {
            Customer customer = customerRepo.findById(customerId).orElseThrow(
                    () -> new CouponSystemException("Can't find customer with id " + customerId));
            if (coupon.getAmount() <= 0) {
                throw new CouponSystemException("This coupon's amount is empty ");
            } else if (coupon.getEndDate().isBefore(LocalDate.now())) {
                throw new CouponSystemException("This coupon is expired");
            }

            if (customer.getCoupons().size() > 0) {
                if (couponRepo.findByIdInCustomer(coupon.getId(),customer.getId()).isPresent()){
                    throw new CouponSystemException("This customer already has a coupon with the same ID");
                }
            }

            coupon.setAmount(coupon.getAmount() - 1);
            customer.addCoupon(coupon);
            customerRepo.save(customer);
            return coupon;

        } catch (Exception e) {
            throw new CouponSystemException("Can't purchase coupon: ",e);
        }

    }

    /**
     * @return A list of all the coupons the customer bought
     */
    public List<Coupon> getCustomerCoupons(int customerId) throws CouponSystemException{
        try {
            Customer customer = customerRepo.findById(customerId)
                    .orElseThrow(() -> new CouponSystemException("Can't find customer with id " + customerId));
            return customer.getCoupons();
        } catch (Exception e) {
            throw new CouponSystemException("Can't get all customer coupons",e);
        }
    }

    public List<Coupon> getCustomerCoupons(Category category, double maxPrice, int customerId) throws CouponSystemException{
        try {
            Customer customer = customerRepo.findById(customerId)
                    .orElseThrow(() -> new CouponSystemException("Can't find customer with id " + customerId));
            return couponRepo.findByCategoryAndMaxPriceAndCustomerId(category.name(), maxPrice, customer.getId());
        } catch (Exception e) {
            throw new CouponSystemException("Can't get all customer coupons",e);
        }
    }

    /**
     * @param category The category to return the coupons of
     * @return A list of all the coupons the customer bought
     */
    public List<Coupon> getCustomerCoupons(Category category, int customerId) throws CouponSystemException{
        try {
            Customer customer = customerRepo.findById(customerId)
                    .orElseThrow(() -> new CouponSystemException("Can't find customer with id " + customerId));
            return couponRepo.findByCategoryAndCustomerId(category.name(), customer.getId());
        } catch (Exception e) {
            throw new CouponSystemException("Can't get customer coupons",e);
        }
    }

    /**
     * @param maxPrice The maximum price of the coupons to return
     * @return A list of all the coupons the customer bought
     */
    public List<Coupon> getCustomerCoupons(double maxPrice, int customerId) throws CouponSystemException {
        try {
            Customer customer = customerRepo.findById(customerId)
                    .orElseThrow(() -> new CouponSystemException("Can't find customer with id " + customerId));
            return couponRepo.findByMaxPriceAndCustomerId(maxPrice,customer.getId());
        } catch (Exception e) {
            throw new CouponSystemException("Can't get customer coupons",e);
        }

    }

    /**
     * @return The object of the customer
     */
    public Customer getCustomerDetails(int customerId) throws CouponSystemException{
        try {
            return customerRepo.findById(customerId)
                    .orElseThrow(() -> new CouponSystemException("Can't find customer with id " + customerId));
        } catch (Exception e) {
            throw new CouponSystemException("Can't get customer details",e);
        }
    }
}
