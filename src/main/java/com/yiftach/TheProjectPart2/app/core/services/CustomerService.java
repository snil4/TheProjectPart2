package com.yiftach.TheProjectPart2.app.core.services;

import com.yiftach.TheProjectPart2.app.core.data.Category;
import com.yiftach.TheProjectPart2.app.core.entities.Coupon;
import com.yiftach.TheProjectPart2.app.core.entities.Customer;
import com.yiftach.TheProjectPart2.app.core.exceptions.CouponSystemException;
import com.yiftach.TheProjectPart2.app.core.repositories.CouponRepo;
import com.yiftach.TheProjectPart2.app.core.repositories.CustomerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class CustomerService extends ClientService {

    @Autowired
    private CustomerRepo customerRepo;
    @Autowired
    private CouponRepo couponRepo;
    private int customerID;
    private Customer customer;

    @Override
    public boolean login(String email, String password) throws CouponSystemException {

        try {
            for (Customer customer: customerRepo.findAll()) {

                    if (customer.getEmail().equals(email) && customer.getPassword().equals(password)) {
                        customerID = customer.getId();
                        this.customer = customerRepo.findById(customerID).orElseThrow(() -> new CouponSystemException("Can't find customer with ID " + customerID));
                        return true;
                    }
            }

            return false;


        } catch (Exception e) {
            throw new CouponSystemException("Can't login to customer " + email,e);
        }
    }

    // TODO - Test to see if this function works as it should
    /**
     * @param coupon Coupon to add to the customer
     */
    public void purchaseCoupon(Coupon coupon) throws CouponSystemException {
        try {

            if (coupon.getAmount() <= 0) {
                throw new CouponSystemException("This coupon's amount is 0 ");
            } else if (coupon.getEndDate().isBefore(LocalDate.now())) {
                throw new CouponSystemException("This coupon is expired");
            }

            for (Coupon check : getCustomerCoupons()) {
                if (coupon.getId() == check.getId()) {
                    throw new CouponSystemException("This customer already has a coupon with the same ID");
                }
            }

            coupon.setAmount(coupon.getAmount() - 1);
            customer.addCoupon(coupon);
            couponRepo.save(coupon);

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
        List<Coupon> coupons = new ArrayList<>();

        try {

            for (Coupon coupon: getCustomerCoupons()) {
                if (coupon.getCategory().equals(category)) {
                    coupons.add(coupon);
                }
            }

            return coupons;
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

            for (Coupon coupon: getCustomerCoupons()) {
                if (coupon.getPrice() <= maxPrice) {
                    coupons.add(coupon);
                }
            }

            return coupons;
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
