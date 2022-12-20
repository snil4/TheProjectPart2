package com.yiftach.TheProjectPart2.app.core.tests;

import com.yiftach.TheProjectPart2.app.core.data.Category;
import com.yiftach.TheProjectPart2.app.core.entities.Company;
import com.yiftach.TheProjectPart2.app.core.entities.Coupon;
import com.yiftach.TheProjectPart2.app.core.entities.Customer;
import com.yiftach.TheProjectPart2.app.core.repositories.CustomerRepo;
import com.yiftach.TheProjectPart2.app.core.services.AdminService;
import com.yiftach.TheProjectPart2.app.core.services.CompanyService;
import com.yiftach.TheProjectPart2.app.core.services.CustomerService;
import com.yiftach.TheProjectPart2.app.core.tasks.LoginManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class GeneralTest implements CommandLineRunner {

    @Autowired
    private LoginManager loginManager;

    @Override
    public void run(String... args) throws Exception {

        // Test for admin service
        AdminService adminService = (AdminService) loginManager.login("admin@admin.com"
                ,"admin", LoginManager.ClientType.ADMINISTRATOR);
        Company tnuva = adminService.addCompany(new Company(0,"Tnuva"
                ,"tnuva@tnuva","tnuva"));
        Company tara = adminService.addCompany(new Company(0,"Tara","tara@tara","tara"));
        Company shtraus = adminService.addCompany(new Company(0,"Shtraus"
                ,"shtraus@shtraus","shtraus"));
        adminService.deleteCompany(shtraus.getId());
        tara.setPassword("somethingCool");
        tara = adminService.updateCompany(tara);
        assert adminService.getOneCompany(tara.getId()).getPassword().equals("somethingCool")
                : " The method 'updateCompany' did not operate correctly";
        adminService.getAllCompanies().forEach(System.out::println);
        System.out.println();

        Customer aviv = adminService.addCustomer(new Customer(0,"Aviv","Tal"
                ,"avivt@gmail.com","avivt"));
        Customer yosi = adminService.addCustomer(new Customer(0,"Yosi","park","yosip@gmail.com","yosip"));
        Customer ilay = adminService.addCustomer(new Customer(0,"Ilay","park","ilay@gmail.com","yosip"));
        adminService.deleteCustomer(ilay.getId());
        yosi.setPassword("secretPa$$word");
        yosi = adminService.updateCustomer(yosi);
        assert adminService.getOneCustomer(yosi.getId()).getPassword().equals("secretPa$$word")
                : " The method 'updateCustomer' did not operate correctly";
        adminService.getAllCustomers().forEach(System.out::println);
        System.out.println();
        adminService.getAllCoupons().forEach(System.out::println);
        System.out.println();

        // Test for company service
        CompanyService companyService1 = (CompanyService) loginManager.login(tnuva.getEmail()
                ,tnuva.getPassword(), LoginManager.ClientType.COMPANY);
        Company company1 = companyService1.getCompanyDetails();

        CompanyService companyService2 = (CompanyService) loginManager.login(tara.getEmail(),
                tara.getPassword(), LoginManager.ClientType.COMPANY);
        Company company2 = companyService2.getCompanyDetails();

        System.out.println(companyService1.getCompanyDetails());
        System.out.println(companyService2.getCompanyDetails());

        Coupon coupon1 = new Coupon(0,company1, Category.CAMPING,"Towel1", LocalDate.of(2021,05,15),LocalDate.of(2023,02,10),100,50);
        Coupon coupon2 = new Coupon(0,company1, Category.CAMPING,"Towel2", LocalDate.of(2021,05,15),LocalDate.of(2022,12,18),100,100);
        Coupon coupon3 = new Coupon(0,company1, Category.CLOTHING,"Towel3", LocalDate.of(2021,05,15),LocalDate.of(2023,06,25),100,70);
        Coupon coupon4 = new Coupon(0,company1, Category.CLOTHING,"Towel4", LocalDate.of(2021,05,15),LocalDate.of(2023,06,25),100,50);

        coupon1 = companyService1.addCoupon(coupon1);
        coupon2 = companyService1.addCoupon(coupon2);
        coupon3 = companyService1.addCoupon(coupon3);
        coupon4 = companyService1.addCoupon(coupon4);

        coupon3.setAmount(150);
        companyService1.updateCoupon(coupon3);
        companyService1.deleteCoupon(coupon2.getId());

        companyService1.getCompanyCoupons().forEach(System.out::println);
        System.out.println();
        companyService1.getCompanyCoupons(50).forEach(System.out::println);
        System.out.println();
        companyService1.getCompanyCoupons(Category.CLOTHING).forEach(System.out::println);
        System.out.println();

        // Test for customer service
        CustomerService customerService = (CustomerService) loginManager.login(aviv.getEmail(), aviv.getPassword()
                , LoginManager.ClientType.CUSTOMER);
        System.out.println(customerService.getCustomerDetails());

        customerService.purchaseCoupon(coupon1);
        customerService.purchaseCoupon(coupon3);
        customerService.purchaseCoupon(coupon4);

        customerService.getCustomerCoupons().forEach(System.out::println);
        System.out.println();
        customerService.getCustomerCoupons(70).forEach(System.out::println);
        System.out.println();
        customerService.getCustomerCoupons(Category.CLOTHING).forEach(System.out::println);
    }
}
