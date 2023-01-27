package com.yiftach.TheProjectPart3.app.core.services;

import com.yiftach.TheProjectPart3.app.core.data.Role;
import com.yiftach.TheProjectPart3.app.core.entities.Admin;
import com.yiftach.TheProjectPart3.app.core.entities.Client;
import com.yiftach.TheProjectPart3.app.core.entities.Company;
import com.yiftach.TheProjectPart3.app.core.entities.Customer;
import com.yiftach.TheProjectPart3.app.core.exceptions.CouponSystemException;
import com.yiftach.TheProjectPart3.app.core.repositories.AdminRepo;
import com.yiftach.TheProjectPart3.app.core.repositories.ClientRepo;
import com.yiftach.TheProjectPart3.app.core.repositories.CompanyRepo;
import com.yiftach.TheProjectPart3.app.core.repositories.CustomerRepo;
import com.yiftach.TheProjectPart3.app.core.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.kafka.KafkaProperties;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.util.Optional;

@Component
@Transactional
public abstract class ClientService {

    @Autowired
    private ClientRepo clientRepo;
    @Autowired
    private AdminRepo adminRepo;
    @Autowired
    private CompanyRepo companyRepo;
    @Autowired
    private CustomerRepo customerRepo;
    private JwtUtil jwtUtil;

    /**
     * @return True if the login went successfully
     * @throws CouponSystemException In case of a connection error
     */
    public String login(String email, String password) throws CouponSystemException {
        try {
            Optional<Client> client = clientRepo.findByEmailAndPassword(email, password);
            if (client.isPresent()) {
                return jwtUtil.generateToken(client.get());
            } else {
                return null;
            }
        } catch (Exception e) {
            throw new CouponSystemException("Can't login ",e);
        }
    }

    public String register(String name, String lastName, String email, String password, Role role) throws CouponSystemException{
        try {
            Client client;
            switch (role) {
                case ADMIN:
                    Admin admin = new Admin(0,name,email,password);
                    admin = adminRepo.save(admin);
                    client = new Client(0, admin.getId(), admin.getName(),
                            admin.getEmail(), admin.getPassword(), Role.ADMIN);
                    break;
                case COMPANY:
                    Company company = new Company(0,name,email,password);
                    company = companyRepo.save(company);
                    client = new Client(0, company.getId(), company.getName(),
                            company.getEmail(), company.getPassword(), Role.COMPANY);
                    break;
                case CUSTOMER:
                    Customer customer = new Customer(0, name, lastName, email, password);
                    customer = customerRepo.save(customer);
                    client = new Client(0, customer.getId(),
                            customer.getFirstName() + " " + customer.getLastName(),
                            customer.getEmail(), customer.getPassword(), Role.CUSTOMER);
                    break;
                default:
                    throw new CouponSystemException("Role unavailable");
            }
            client = clientRepo.save(client);
            return jwtUtil.generateToken(client);
        } catch (Exception e) {
            throw new CouponSystemException("Can't register new client");
        }
    }
}
