package com.yiftach.TheProjectPart2.app.core.services;

import com.yiftach.TheProjectPart2.app.core.data.Category;
import com.yiftach.TheProjectPart2.app.core.entities.Coupon;
import com.yiftach.TheProjectPart2.app.core.entities.Customer;
import com.yiftach.TheProjectPart2.app.core.exceptions.CouponSystemException;
import com.yiftach.TheProjectPart2.app.core.repositories.CouponRepo;
import com.yiftach.TheProjectPart2.app.core.repositories.CustomerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@Scope("prototype")
public class CustomerService extends ClientService {

    @Autowired
    private CustomerRepo customerRepo;
    @Autowired
    private CouponRepo couponRepo;
    private Customer customer;

    @Override
    public boolean login(String email, String password) throws CouponSystemException {

        try {
            if (customerRepo.existsByEmailAndPassword(email, password)) {
                customer = customerRepo.findByEmail(email).orElseThrow();
                return true;
            }

            return false;


        } catch (Exception e) {
            throw new CouponSystemException("Can't login to customer " + email,e);
        }
    }

    /**
     * @param coupon Coupon to add to the customer
     */
    public void purchaseCoupon(Coupon coupon) throws CouponSystemException {
        try {

            if (coupon.getAmount() <= 0) {
                throw new CouponSystemException("This coupon's amount is empty ");
            } else if (coupon.getEndDate().isBefore(LocalDate.now())) {
                throw new CouponSystemException("This coupon is expired");
            }

            if (getCustomerCoupons().size() > 0) {
                if (couponRepo.findByIdInCustomer(coupon.getId(),customer.getId()).isPresent()){
                    throw new CouponSystemException("This customer already has a coupon with the same ID");
                }
            }

            coupon.setAmount(coupon.getAmount() - 1);
            customer.addCoupon(coupon);
            customerRepo.save(customer);

        } catch (Exception e) {
            throw new CouponSystemException("Can't purchase coupon: ",e);
        }

    }

    /**
     * @return A list of all the coupons the customer bought
     */
    public List<Coupon> getCustomerCoupons() throws CouponSystemException{
        try {
            return customer.getCoupons();
        } catch (Exception e) {
            throw new CouponSystemException("Can't get all customer coupons",e);
        }
    }

    /**
     * @param category The category to return the coupons of
     * @return A list of all the coupons the customer bought
     */
    public List<Coupon> getCustomerCoupons(Category category) throws CouponSystemException{
        try {
            return couponRepo.findByCategoryAndCustomerId(category.name(), customer.getId());
        } catch (Exception e) {
            throw new CouponSystemException("Can't get customer coupons",e);
        }
    }

    /**
     * @param maxPrice The maximum price of the coupons to return
     * @return A list of all the coupons the customer bought
     */
    public List<Coupon> getCustomerCoupons(double maxPrice) throws CouponSystemException {
        List<Coupon> coupons = new ArrayList<>();

        try {
            return couponRepo.findByMaxPriceAndCustomerId(maxPrice,customer.getId());
        } catch (Exception e) {
            throw new CouponSystemException("Can't get customer coupons",e);
        }

    }

    /**
     * @return The object of the customer
     */
    public Customer getCustomerDetails() throws CouponSystemException{
        try {
            return this.customer;

        } catch (Exception e) {
            throw new CouponSystemException("Can't get customer details",e);
        }
    }
}
