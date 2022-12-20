package com.yiftach.TheProjectPart2.app.core.services;

import com.yiftach.TheProjectPart2.app.core.data.Category;
import com.yiftach.TheProjectPart2.app.core.entities.Company;
import com.yiftach.TheProjectPart2.app.core.entities.Coupon;
import com.yiftach.TheProjectPart2.app.core.exceptions.CouponSystemException;
import com.yiftach.TheProjectPart2.app.core.repositories.CompanyRepo;
import com.yiftach.TheProjectPart2.app.core.repositories.CouponRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@Scope("prototype")
public class CompanyService extends ClientService {

    @Autowired
    private CompanyRepo companyRepo;
    @Autowired
    private CouponRepo couponRepo;
    private int companyID;
    private Company company;

    @Override
    public boolean login(String email, String password) throws CouponSystemException {

        try {
            List<Company> companies = companyRepo.findAll();

            for (Company company:companies) {

                if (company.getEmail().equals(email) && company.getPassword().equals(password)) {
                    this.companyID = company.getId();
                    this.company = companyRepo.findById(companyID).
                            orElseThrow(() -> new CouponSystemException("Can't find company"));
                    return true;

                }
            }
                return false;

        } catch (Exception e) {
            throw new CouponSystemException("Can't login",e);
        }
    }

    /** Add a new coupon to the company and the database
     * @param coupon Coupon to add
     */
    public Coupon addCoupon(Coupon coupon) throws CouponSystemException {
        try {
            List<Coupon> coupons = company.getCoupons();

            if (coupons != null) {
                for (Coupon check : coupons) {

                    if (check.getTitle().equals(coupon.getTitle())
                            || check.getId() == coupon.getId()) {
                        throw new CouponSystemException("Can't add coupon, coupon with the same name or ID already exists in company");
                    } else if (coupon.getEndDate().isBefore(LocalDate.now())) {
                        throw new CouponSystemException("The coupon you're trying to add is expired");
                    }

                }
            }

            coupon.setCompany(this.company);
            coupon = couponRepo.save(coupon);
            return company.addCoupon(coupon);

        } catch (Exception e) {
            throw new CouponSystemException(e);
        }
    }

    // TODO - check if this works correctly both for the coupon and the company
    /** Update an existing coupon in the database
     * @param coupon Coupon to update
     */
    public Coupon updateCoupon(Coupon coupon) throws CouponSystemException {
        try {

            List<Coupon> coupons = getCompanyCoupons();

            for (Coupon check : coupons) {

                if (check.getId() == coupon.getId()) {
                    company.updateCoupon(coupon);
                    this.company = companyRepo.save(company);
                    return couponRepo.save(coupon);
                }
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
            List<Coupon> coupons = getCompanyCoupons();
            List<Coupon> new_coupons = new ArrayList<>();

            for (Coupon coupon:coupons) {
                if (coupon.getCategory().equals(category)) {
                    new_coupons.add(coupon);

                }
            }

            return new_coupons;
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
            List<Coupon> coupons = getCompanyCoupons();
            List<Coupon> new_coupons = new ArrayList<>();

            for (Coupon coupon:coupons) {
                if (coupon.getPrice() <= maxPrice) {
                    new_coupons.add(coupon);

                }
            }

            return new_coupons;

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
