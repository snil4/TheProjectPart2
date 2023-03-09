package com.yiftach.TheProjectPart3.app.core.services;

import com.yiftach.TheProjectPart3.app.core.data.Category;
import com.yiftach.TheProjectPart3.app.core.data.Role;
import com.yiftach.TheProjectPart3.app.core.entities.Client;
import com.yiftach.TheProjectPart3.app.core.entities.Company;
import com.yiftach.TheProjectPart3.app.core.entities.Coupon;
import com.yiftach.TheProjectPart3.app.core.exceptions.CouponSystemException;
import com.yiftach.TheProjectPart3.app.core.repositories.CompanyRepo;
import com.yiftach.TheProjectPart3.app.core.repositories.CouponRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

// TODO - make this work with the new authentication/authorization system
@Component
@Transactional
public class CompanyService extends ClientService {

    @Autowired
    private CompanyRepo companyRepo;
    @Autowired
    private CouponRepo couponRepo;

    public String login(String email, String password) throws CouponSystemException {
        Optional<Company> optional = companyRepo.findByEmailAndPassword(email, password);
        if (optional.isPresent()) {
            Company company = optional.get();
            return this.getToken(new Client(company.getId(), company.getName(), company.getEmail(), Role.COMPANY));
        } else {
            return null;
        }
    }

    /** Add a new coupon to the company and the database
     * @param coupon Coupon to add
     */
    public Coupon addCoupon(Coupon coupon, int companyId) throws CouponSystemException {
        try {
            Company company = companyRepo.findById(companyId).orElseThrow(
                    () -> new CouponSystemException("Company with id " + companyId + "doesn't exist"));
            List<Coupon> coupons = couponRepo.findByCompanyId(companyId);

            if (coupons != null) {
                if (coupon.getEndDate().isBefore(LocalDate.now())) {
                    throw new CouponSystemException("The coupon you're trying to add is expired");
                }
            }

            coupon.setCompany(company);
            coupon = couponRepo.save(coupon);
            company.addCoupon(coupon);
            companyRepo.save(company);
            return coupon;

        } catch (Exception e) {
            throw new CouponSystemException(e);
        }
    }

    /** Update an existing coupon in the database
     * @param coupon Coupon to update
     */
    public Coupon updateCoupon(Coupon coupon, int companyId) throws CouponSystemException {
        try {
            Company company = companyRepo.findById(companyId).orElseThrow(
                    () -> new CouponSystemException("Can't find company with id " + companyId));
                if (couponRepo.existsById(coupon.getId())) {
                    company.updateCoupon(coupon);
                    company = companyRepo.save(company);
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
    public void deleteCoupon(int couponID, int companyId) throws CouponSystemException {
        try {
            Company company = companyRepo.findById(companyId).orElseThrow(
                    () -> new CouponSystemException("Can't find coupon with id " + companyId));
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
    public List<Coupon> getCompanyCoupons(int companyId) throws CouponSystemException {

        try {
            return couponRepo.findByCompanyId(companyId);
        } catch (Exception e) {
            throw new CouponSystemException("Can't get comapny coupons",e);
        }
    }

    /**
     * @param category The category of the coupons
     * @return A list of coupons from this company filtered by category
     *
     */
    public List<Coupon> getCompanyCoupons(Category category, int companyId) throws CouponSystemException {

        try {
            return couponRepo.findByCategoryAndCompanyId(category, companyId);
        } catch (Exception e) {
            throw new CouponSystemException("Can't get all company coupons by category " + category.name(),e);
        }
    }

    /**
     * @param maxPrice The maximum price of the coupons
     * @return A list of coupons from this company that do not exceed the maximum price
     */
    public List<Coupon> getCompanyCoupons(double maxPrice, int companyId) throws CouponSystemException {

        try {
            return couponRepo.findByPriceLessThanEqualAndCompanyId(maxPrice, companyId);

        } catch (Exception e) {
            throw new CouponSystemException("Can't get company coupons ",e);
        }
    }

    public List<Coupon> getCompanyCoupons(Category category, double maxPrice, int companyId) throws CouponSystemException {

        try {
            return couponRepo.findByCategoryAndPriceLessThanEqualAndCompanyId(category, maxPrice, companyId);

        } catch (Exception e) {
            throw new CouponSystemException("Can't get company coupons ",e);
        }
    }

    public Coupon getOneCoupon(int id, int companyId) throws CouponSystemException{
        try {
            return couponRepo.findByIdAndCompanyId(id,companyId).orElseThrow(() ->
                    new CouponSystemException("Can't find coupon with id " + id + " in company with id " + companyId));
        } catch (Exception e) {
            throw new CouponSystemException("Can't get coupon ", e);
        }
    }

    /**
     * @return The object of the company
     */
    public Company getCompanyDetails(int companyId) throws CouponSystemException {
        try {
            return companyRepo.findById(companyId).orElseThrow(
                    () -> new CouponSystemException("Can't find company with id " + companyId));
        } catch (Exception e) {
            throw new CouponSystemException("Can't get company details",e);
        }
    }
}
