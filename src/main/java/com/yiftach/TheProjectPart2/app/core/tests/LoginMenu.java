package com.yiftach.TheProjectPart2.app.core.tests;

import com.yiftach.TheProjectPart2.app.core.exceptions.CouponSystemException;
import com.yiftach.TheProjectPart2.app.core.services.AdminService;
import com.yiftach.TheProjectPart2.app.core.services.CompanyService;
import com.yiftach.TheProjectPart2.app.core.services.CustomerService;
import com.yiftach.TheProjectPart2.app.core.tasks.LoginManager;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Scanner;

public class LoginMenu {

    @Autowired
    private LoginManager loginManager;
    private int menu = 0;
    private Scanner scanner = new Scanner(System.in);
    private String email;
    private String password;


    public void loginMenu() {
        switch (menu) {
            case 0:
                System.out.println("Login Menu:\n" +
                        "1.Login as admin\n" +
                        "2.Login as Company\n" +
                        "3.Login as Customer\n" +
                        "4.Return to main menu\n");
                menu = scanner.nextInt();
                break;
            case 1:
                System.out.println("Enter your email:");
                email = scanner.nextLine();
                System.out.println("Enter your password");
                password = scanner.nextLine();
                try {
                    AdminService adminService = (AdminService) loginManager
                            .login(email, password, LoginManager.ClientType.ADMINISTRATOR);
                } catch (CouponSystemException e) {
                    e.printStackTrace();
                    menu = 0;
                }
                break;
            case 2:
                System.out.println("Enter your email:");
                email = scanner.nextLine();
                System.out.println("Enter your password:");
                password = scanner.nextLine();
                try {
                    CompanyService companyService = (CompanyService) loginManager
                            .login(email, password, LoginManager.ClientType.COMPANY);
                } catch (CouponSystemException e) {
                    menu = 0;
                }
                break;
            case 3:
                System.out.println("Enter your email:");
                email = scanner.nextLine();
                System.out.println("Enter your password:");
                password = scanner.nextLine();
                try {
                    CustomerService customerService = (CustomerService) loginManager
                            .login(email, password, LoginManager.ClientType.CUSTOMER);
                } catch (CouponSystemException e) {
                    menu = 0;
                }
                break;
            case 4:
                break;
        }
    }
}
