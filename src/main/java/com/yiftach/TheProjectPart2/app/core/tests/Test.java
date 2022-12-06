package com.yiftach.TheProjectPart2.app.core.tests;

import com.yiftach.TheProjectPart2.app.core.services.AdminService;
import com.yiftach.TheProjectPart2.app.core.services.CompanyService;
import com.yiftach.TheProjectPart2.app.core.services.CustomerService;
import com.yiftach.TheProjectPart2.app.core.tasks.CouponExpirationDailyJob;
import com.yiftach.TheProjectPart2.app.core.tasks.LoginManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class Test implements CommandLineRunner {

    @Autowired
    private AdminService adminService;
    @Autowired
    private CompanyService companyService;
    @Autowired
    private CustomerService customerService;
    @Autowired
    private CouponExpirationDailyJob dailyJob;
    @Autowired
    private LoginManager loginManager;


    @Override
    public void run(String... args) throws Exception {

    }

}
