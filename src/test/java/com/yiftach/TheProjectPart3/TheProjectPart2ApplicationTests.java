//package com.yiftach.TheProjectPart3;
//
//import com.yiftach.TheProjectPart3.app.core.data.Category;
//import com.yiftach.TheProjectPart3.app.core.data.Role;
//import com.yiftach.TheProjectPart3.app.core.entities.Company;
//import com.yiftach.TheProjectPart3.app.core.entities.Coupon;
//import com.yiftach.TheProjectPart3.app.core.entities.Customer;
//import com.yiftach.TheProjectPart3.app.core.exceptions.CouponSystemException;
//import com.yiftach.TheProjectPart3.app.core.services.AdminService;
//import com.yiftach.TheProjectPart3.app.core.services.CompanyService;
//import com.yiftach.TheProjectPart3.app.core.services.CustomerService;
//import com.yiftach.TheProjectPart3.app.core.tasks.LoginManager;
//import org.junit.jupiter.api.*;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//
//import java.time.LocalDate;
//
//@SpringBootTest
//@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
//class TheProjectPart2ApplicationTests {
//
//	@Autowired
//	private LoginManager loginManager;
//	private static boolean firstPassed = false;
//
//	@Test
//	@Order(1)
//	void adminTest() throws Exception {
//
//		// Test for admin service
//		System.out.println("=======ADMIN SERVICE TEST=========");
//		AdminService adminService = (AdminService) loginManager.login("admin@admin.com"
//				, "admin", Role.ADMIN);
//		Company tnuva = adminService.addCompany(new Company(0, "Tnuva"
//				, "tnuva@tnuva", "tnuva"));
//		Company tara = adminService.addCompany(new Company(0, "Tara", "tara@tara", "tara"));
//		Company shtraus = adminService.addCompany(new Company(0, "Shtraus"
//				, "shtraus@shtraus", "shtraus"));
//		adminService.deleteCompany(shtraus.getId());
//
//		tara.setPassword("somethingCool");
//		tara = adminService.updateCompany(tara);
//		assert adminService.getOneCompany(tara.getId()).getPassword().equals("somethingCool")
//				: " The method 'updateCompany' did not operate correctly";
//		adminService.getAllCompanies().forEach(System.out::println);
//		Assertions.assertEquals(adminService.getAllCompanies().size(), 2);
//		System.out.println();
//
//		// Check 'addCustomer' method
//		Customer aviv = adminService.addCustomer(new Customer(0, "Aviv", "Tal",
//				"avivt@gmail.com", "avivt"));
//		Customer yosi = adminService.addCustomer(new Customer(0, "Yosi", "park",
//				"yosip@gmail.com", "yosip"));
//		Customer ilay = adminService.addCustomer(new Customer(0, "Ilay", "park",
//				"ilay@gmail.com", "yosip"));
//		// Check 'deleteCustomer' method
//		adminService.deleteCustomer(ilay.getId());
//		Assertions.assertEquals(adminService.getAllCustomers().size(),2);
//		// Check 'updateCustomer' and 'getOneCustomer' methods
//		yosi.setPassword("secretPa$$word");
//		yosi = adminService.updateCustomer(yosi);
//		assert adminService.getOneCustomer(yosi.getId()).getPassword().equals("secretPa$$word")
//				: " The method 'updateCustomer' did not operate correctly";
//		adminService.getAllCustomers().forEach(System.out::println);
//		System.out.println();
//		adminService.getAllCoupons().forEach(System.out::println);
//		System.out.println();
//		firstPassed = true;
//	}
//
//	@Test
//	@Order(2)
//	public void companyCustomerTest() throws Exception {
//		if (!firstPassed) {
//			AdminService adminService = (AdminService) loginManager.login("admin@admin.com"
//					, "admin", Role.ADMINISTRATOR);
//			adminService.addCompany(new Company(0, "Tnuva"
//					, "tnuva@tnuva", "tnuva"));
//			adminService.addCompany(new Company(0, "Tara", "tara@tara", "SomethingCool"));
//
//			adminService.addCustomer(new Customer(0, "Aviv", "Tal",
//					"avivt@gmail.com", "avivt"));
//			adminService.addCustomer(new Customer(0, "Yosi", "park",
//					"yosip@gmail.com", "secretPa$$word"));
//		}
//		// Test for company service
//		System.out.println("=======COMPANY SERVICE TEST========");
//		CompanyService companyService1 = (CompanyService) loginManager.login("tnuva@tnuva"
//				, "tnuva", LoginManager.ClientType.COMPANY);
//		Company company1 = companyService1.getCompanyDetails();
//
//		CompanyService companyService2 = (CompanyService) loginManager.login("tara@tara",
//				"somethingCool", LoginManager.ClientType.COMPANY);
//		Company company2 = companyService2.getCompanyDetails();
//
//		System.out.println(companyService1.getCompanyDetails());
//		System.out.println(companyService2.getCompanyDetails());
//
//		Coupon coupon1 = new Coupon(0, company1, Category.CAMPING, "Towel1", LocalDate.of(2021, 05, 15), LocalDate.of(2023, 03, 10), 100, 50);
//		Coupon coupon2 = new Coupon(0, company1, Category.CAMPING, "Towel2", LocalDate.of(2021, 05, 15), LocalDate.of(2022, 12, 18), 100, 100);
//		Coupon coupon3 = new Coupon(0, company1, Category.CLOTHING, "Towel3", LocalDate.of(2021, 05, 15), LocalDate.of(2023, 06, 25), 100, 70);
//		Coupon coupon4 = new Coupon(0, company1, Category.CLOTHING, "Towel4", LocalDate.of(2021, 05, 15), LocalDate.of(2023, 06, 25), 100, 50);
//
//		coupon1 = companyService1.addCoupon(coupon1);
//		// This coupon is outdated so it should throw an exception
//		Assertions.assertThrows(CouponSystemException.class, () -> companyService1.addCoupon(coupon2));
//		coupon3 = companyService1.addCoupon(coupon3);
//		coupon4 = companyService1.addCoupon(coupon4);
//
//		coupon3.setAmount(150);
//		Coupon coupon5 = companyService1.updateCoupon(coupon3);
//		Assertions.assertEquals(coupon3.getId(), coupon5.getId());
//		companyService1.deleteCoupon(coupon2.getId());
//
//		companyService1.getCompanyCoupons().forEach(System.out::println);
//		System.out.println();
//		companyService1.getCompanyCoupons(50).forEach(System.out::println);
//		System.out.println();
//		companyService1.getCompanyCoupons(Category.CLOTHING).forEach(System.out::println);
//		System.out.println();
//
//		// Test for customer service
//		System.out.println("=======CUSTOMER SERVICE TEST========");
//		CustomerService customerService = (CustomerService) loginManager.login("avivt@gmail.com", "avivt"
//				, LoginManager.ClientType.CUSTOMER);
//		System.out.println(customerService.getCustomerDetails());
//		Assertions.assertEquals(customerService.getCustomerDetails().getEmail(),"avivt@gmail.com");
//
//		// check 'purchaseCoupon' method
//		customerService.purchaseCoupon(coupon1);
//		customerService.purchaseCoupon(coupon3);
//		customerService.purchaseCoupon(coupon4);
//
//		customerService.getCustomerCoupons().forEach(System.out::println);
//		Assertions.assertEquals(customerService.getCustomerCoupons().size(),3);
//		System.out.println();
//		customerService.getCustomerCoupons(50).forEach(System.out::println);
//		Assertions.assertEquals(customerService.getCustomerCoupons(50).size(),2);
//		System.out.println();
//		customerService.getCustomerCoupons(Category.CLOTHING).forEach(System.out::println);
//		Assertions.assertEquals(customerService.getCustomerCoupons(Category.CLOTHING).size(), 2);
//	}
//
//}
