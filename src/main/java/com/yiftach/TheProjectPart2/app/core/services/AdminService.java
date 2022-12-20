package com.yiftach.TheProjectPart2.app.core.services;

import com.yiftach.TheProjectPart2.app.core.entities.Company;
import com.yiftach.TheProjectPart2.app.core.entities.Coupon;
import com.yiftach.TheProjectPart2.app.core.entities.Customer;
import com.yiftach.TheProjectPart2.app.core.exceptions.CouponSystemException;
import com.yiftach.TheProjectPart2.app.core.repositories.CompanyRepo;
import com.yiftach.TheProjectPart2.app.core.repositories.CouponRepo;
import com.yiftach.TheProjectPart2.app.core.repositories.CustomerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@Scope("prototype")
public class AdminService extends ClientService {

    private final String EMAIL = "admin@admin.com";
    private final String PASSWORD = "admin";

    @Autowired
    private CompanyRepo companyRepo;
    @Autowired
    private CustomerRepo customerRepo;
    @Autowired
    private CouponRepo couponRepo;

    @Override
    public boolean login(String email, String password) {
        return email.equals(this.EMAIL) && (password.equals(this.PASSWORD));

    }

    /**
     * Adds a new company to the database
     * @param company The company to add to the database
     */
    public Company addCompany(Company company) throws CouponSystemException {

        try {
            for (Company check : companyRepo.findAll()) {

                if (check.getName().equals(company.getName())) {
                    throw new CouponSystemException("A company with the same name already exists.");

                } else if (check.getEmail().equals(company.getEmail())) {
                    throw new CouponSystemException("A company with the same email already exists.");
                }
            }

            return companyRepo.save(company);

        } catch (Exception e) {
            throw new CouponSystemException("Can't add company " + company.getId(),e);
        }

    }


    /**
     * Update an existing company in the database
     * @param company The company to update in the database
     */
    public Company updateCompany(Company company) throws CouponSystemException {

        try {
            Optional<Company> optional = companyRepo.findById(company.getId());

            // The name of the company can't be changed,
            // this sets the name from the company in the database to the arg company.
            if (optional.isPresent()) {
                Company new_company = optional.get();
                company.setName(new_company.getName());

            } else {
                throw new CouponSystemException("Company with ID " + company.getId() + "Doesn't exist.");
            }

            return companyRepo.save(company);

        } catch (Exception e) {
            throw new CouponSystemException("Can't update company",e);
        }

    }


    // TODO - Test if coupons also get deleted
    /**
     * Deletes a company from the database
     * @param companyID The ID of the company to delete from the database
     */
    public void deleteCompany(int companyID) throws CouponSystemException {
        try {
            Optional<Company> optional = companyRepo.findById(companyID);

            if (optional.isPresent()) {
                Company company = optional.get();

                if (company.getCoupons() != null) {
                    for (Coupon coupon : company.getCoupons()) {
                        couponRepo.delete(coupon);

                    }
                }

                companyRepo.delete(company);

            } else {
                throw new CouponSystemException("Company with ID " + companyID + " doesn't exist");

            }

        } catch (Exception e) {
            throw new CouponSystemException("Can't delete company ",e);
        }

    }

    /**
     * @return A list of all the companies in the database
     */
    public List<Company> getAllCompanies() throws CouponSystemException {
        try {
            return companyRepo.findAll();
        } catch (Exception e) {
            throw new CouponSystemException(e);
        }
    }

    /**
     * @param companyID The company to get from the database
     * @return Company from the database with the ID
     */
    public Company getOneCompany(int companyID) throws CouponSystemException {
        try {
            Optional<Company> optional = companyRepo.findById(companyID);

            if (optional.isPresent()) {
                return optional.get();
            } else {
                throw new CouponSystemException("Can't find company with ID " + companyID);
            }

        } catch (Exception e) {
            throw new CouponSystemException(e);
        }
    }

    /** Adds a customer to the database
     * @param customer The customer to add to the database
     */
    public Customer addCustomer(Customer customer) throws CouponSystemException{
        try {

            for (Customer check: customerRepo.findAll()) {

                if (customer.getEmail().equals(check.getEmail())) {
                    throw new CouponSystemException("Customer with the same email already exists");

                }
            }

            return customerRepo.save(customer);

        } catch (Exception e){
            throw new CouponSystemException("Can't add customer " + customer.getId(),e);
        }
    }

    /** Update an existing customer in the database
     * @param customer The customer to update in the database
     */
    public Customer updateCustomer(Customer customer) throws CouponSystemException {
        try {
            return customerRepo.save(customer);
        } catch (Exception e) {
            throw new CouponSystemException("Can't update customer " + customer.getId(),e);
        }
    }

    // TODO - Test if coupons get also deleted
    /** Delete a customer from the database
     * @param customerID The ID of the customer to delete
     */
    public void deleteCustomer(int customerID) throws CouponSystemException {
        try {
            Optional<Customer> optional = customerRepo.findById(customerID);

            if (optional.isPresent()) {
                Customer customer = optional.get();

                customerRepo.delete(customer);

            } else {
                throw new CouponSystemException("Customer with ID " + customerID + " doesn't exist");

            }
        } catch (Exception e) {
            throw new CouponSystemException("Can't delete customer " + customerID,e);

        }
    }

    /**
     * @return A list of all the customers in the database
     */
    public List<Customer> getAllCustomers() throws CouponSystemException {

        try {
            return customerRepo.findAll();

        } catch (Exception e) {
            throw new CouponSystemException("Can't get all customers",e);

        }
    }

    /**
     * @param customerID The ID of the customer to get from the database
     * @return The customer from the database
     */
    public Customer getOneCustomer(int customerID) throws CouponSystemException {

        try {
            Optional<Customer> optional = customerRepo.findById(customerID);

            if (optional.isPresent()) {
                Customer customer = optional.get();
                return  customer;

            } else {
                throw new CouponSystemException("Can't find customer with ID " + customerID);
            }

        } catch (Exception e) {
            throw new CouponSystemException("Can't get cutsomer " + customerID,e);
        }
    }

    public List<Coupon> getAllCoupons() throws CouponSystemException {

        try {
            return couponRepo.findAll();

        } catch (Exception e) {
            throw new CouponSystemException("Can't get all coupons",e);
        }
    }
}
