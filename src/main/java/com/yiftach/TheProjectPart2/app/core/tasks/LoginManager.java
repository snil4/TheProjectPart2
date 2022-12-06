package com.yiftach.TheProjectPart2.app.core.tasks;

import com.yiftach.TheProjectPart2.app.core.exceptions.CouponSystemException;
import com.yiftach.TheProjectPart2.app.core.services.AdminService;
import com.yiftach.TheProjectPart2.app.core.services.ClientService;
import com.yiftach.TheProjectPart2.app.core.services.CompanyService;
import com.yiftach.TheProjectPart2.app.core.services.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

// Singleton class that manages logins and returns a user object base on input
@Component
public class LoginManager {

    @Autowired
    private AdminService ADMIN_SERVICE;
    @Autowired
    private CompanyService COMPANY_SERVICE;
    @Autowired
    private CustomerService CUSTOMER_SERVICE;

    /**
     * @param email      Client's email
     * @param password   Client's password
     * @param clientType The client's type
     * @return Object of the client based on input
     */
    public ClientService Login(String email, String password, ClientType clientType) throws CouponSystemException {

        if (clientType == ClientType.ADMINISTRATOR && ADMIN_SERVICE.login(email, password)) {
            return ADMIN_SERVICE;

        } else if (clientType == ClientType.COMPANY && COMPANY_SERVICE.login(email, password)) {
            return COMPANY_SERVICE;

        } else if (clientType == ClientType.CUSTOMER && CUSTOMER_SERVICE.login(email, password)) {
            return CUSTOMER_SERVICE;

        }

        return null;
    }


    public enum ClientType {
        ADMINISTRATOR, COMPANY, CUSTOMER
    }
}
