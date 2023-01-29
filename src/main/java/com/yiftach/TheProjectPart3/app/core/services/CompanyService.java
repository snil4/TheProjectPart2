package com.yiftach.TheProjectPart3.app.core.services;

import com.yiftach.TheProjectPart3.app.core.data.Category;
import com.yiftach.TheProjectPart3.app.core.entities.Company;
import com.yiftach.TheProjectPart3.app.core.entities.Coupon;
import com.yiftach.TheProjectPart3.app.core.exceptions.CouponSystemException;
import com.yiftach.TheProjectPart3.app.core.repositories.CompanyRepo;
import com.yiftach.TheProjectPart3.app.core.repositories.CouponRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Component
@Transactional
public class CompanyService extends AbstractService {

    @Autowired
    private CompanyRepo companyRepo;
    @Autowired
    private CouponRepo couponRepo;
    private Company company;


    /** Add a new coupon to the company and the database
     * @param coupon Coupon to add
     */
    public Coupon addCoupon(Coupon coupon) throws CouponSystemException {
        try {
            List<Coupon> coupons = company.getCoupons();

            if (coupons != null) {
                if (coupon.getEndDate().isBefore(LocalDate.now())) {
                    throw new CouponSystemException("The coupon you're trying to add is expired");
                }
            }

            coupon.setCompany(this.company);
            coupon = couponRepo.save(coupon);
            return company.addCoupon(coupon);

        } catch (Exception e) {
            throw new CouponSystemException(e);
        }
    }

    /** Update an existing coupon in the database
     * @param coupon Coupon to update
     */
    public Coupon updateCoupon(Coupon coupon) throws CouponSystemException {
        try {
                if (couponRepo.existsById(coupon.getId())) {
                    company.updateCoupon(coupon);
                    this.company = companyRepo.save(company);
                    return couponRepo.save(coupon);
                }

            throw new CouponSystemException("No coupon with ID " + coupon.getId() + " found in the company");

        } catch (Exception e) {
            throw new CouponSystemException("Can't update coupon " + coupon.getId(),e);
        }
    }

    /** Delete a coupon from the database based on ID
     * @param couponID The ID of the coupon to delete
     */
    public void deleteCoupon(int couponID) throws CouponSystemException {
        try {
            Optional<Coupon> optional = couponRepo.findById(couponID);

                if (optional.isPresent()) {
                    Coupon coupon = optional.get();

                    if (coupon.getCompany().equals(company)) {
                        company.removeCoupon(couponID);

                        companyRepo.save(company);
                        couponRepo.delete(coupon);

                    } else {
                        throw new CouponSystemException("Coupon with ID " + couponID + " is not in this company");
                    }
                }

        } catch (Exception e) {
            throw new CouponSystemException("Can't delete coupon with ID " + couponID, e);
        }
    }

    /**
     * @return A list of coupons of this company in the database
     */
    public List<Coupon> getCompanyCoupons() throws CouponSystemException {

        try {
            return company.getCoupons();

        } catch (Exception e) {
            throw new CouponSystemException("Can't get comapny coupons",e);
        }
    }

    /**
     * @param category The category of the coupons
     * @return A list of coupons from this company filtered by category
     *
     */
    public List<Coupon> getCompanyCoupons(Category category) throws CouponSystemException {

        try {
            return couponRepo.findByCategoryAndCompanyId(category, company.getId());
        } catch (Exception e) {
            throw new CouponSystemException("Can't get all company coupons by category " + category.name(),e);
        }
    }

    /**
     * @param maxPrice The maximum price of the coupons
     * @return A list of coupons from this company that do not exceed the maximum price
     */
    public List<Coupon> getCompanyCoupons(double maxPrice) throws CouponSystemException {

        try {
            return couponRepo.findByPriceLessThanEqualAndCompanyId(maxPrice, company.getId());

        } catch (Exception e) {
            throw new CouponSystemException("Can't get company coupons ",e);
        }
    }

    public List<Coupon> getCompanyCoupons(Category category, double maxPrice) throws CouponSystemException {

        try {
            return couponRepo.findByCategoryAndPriceLessThanEqualAndCompanyId(category, maxPrice, company.getId());

        } catch (Exception e) {
            throw new CouponSystemException("Can't get company coupons ",e);
        }
    }

    /**
     * @return The object of the company
     */
    public Company getCompanyDetails() throws CouponSystemException {
        try {
            return company;
        } catch (Exception e) {
            throw new CouponSystemException("Can't get company details",e);
        }
    }
}
