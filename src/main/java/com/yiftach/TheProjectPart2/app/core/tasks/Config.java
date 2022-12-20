package com.yiftach.TheProjectPart2.app.core.tasks;

import com.yiftach.TheProjectPart2.app.core.services.AdminService;
import com.yiftach.TheProjectPart2.app.core.services.CompanyService;
import com.yiftach.TheProjectPart2.app.core.services.CustomerService;
import org.springframework.beans.factory.annotation.Lookup;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan
public class Config {

    @Lookup
    public AdminService getAdminService() {
        return new AdminService();
    }

    @Lookup
    public CompanyService getCompanyService() {
        return new CompanyService();
    }

    @Lookup
    public CustomerService getCustomerService() {
        return new CustomerService();
    }

}
