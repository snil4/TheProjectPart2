package com.yiftach.TheProjectPart3.app.core.tasks;

import com.yiftach.TheProjectPart3.app.core.exceptions.CouponSystemException;
import com.yiftach.TheProjectPart3.app.core.services.AdminService;
import com.yiftach.TheProjectPart3.app.core.services.ClientService;
import com.yiftach.TheProjectPart3.app.core.services.CompanyService;
import com.yiftach.TheProjectPart3.app.core.services.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.stereotype.Component;

// Singleton class that manages logins and returns a user object base on input
@Component
public class LoginManager {

    // In order to get a unique object of the service we need to get an instance of ConfigApplicationContext.
    @Autowired
    ConfigurableApplicationContext context;

    /**
     * @param email      Client's email
     * @param password   Client's password
     * @param clientType The client's type
     * @return Unique object of the client based on input
     */
    public ClientService login(String email, String password, ClientType clientType) throws CouponSystemException {

        if (clientType == ClientType.ADMINISTRATOR) {
            AdminService ADMIN_SERVICE = context.getBean(AdminService.class);

            if (ADMIN_SERVICE.login(email, password)) {
                return ADMIN_SERVICE;
            }

        } else if (clientType == ClientType.COMPANY) {
            CompanyService COMPANY_SERVICE = context.getBean(CompanyService.class);

            if (COMPANY_SERVICE.login(email, password)) {
                return COMPANY_SERVICE;
            }

        } else if (clientType == ClientType.CUSTOMER) {
            CustomerService CUSTOMER_SERVICE = context.getBean(CustomerService.class);

            if (CUSTOMER_SERVICE.login(email, password)) {
                return CUSTOMER_SERVICE;
            }
        }

        return null;
    }


    public enum ClientType {
        ADMINISTRATOR, COMPANY, CUSTOMER
    }
}
