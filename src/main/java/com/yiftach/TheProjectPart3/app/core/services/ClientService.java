package com.yiftach.TheProjectPart3.app.core.services;

import com.yiftach.TheProjectPart3.app.core.entities.Client;
import com.yiftach.TheProjectPart3.app.core.exceptions.CouponSystemException;
import com.yiftach.TheProjectPart3.app.core.repositories.ClientRepo;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

public abstract class ClientService {

    @Autowired
    private ClientRepo clientRepo;

    /**
     * @param client The object of the client's identity
     * @return True if the login went successfully
     * @throws CouponSystemException In case of a connection error
     */
    public boolean login(Client client) throws CouponSystemException {
        Optional<Client> optionalClient = clientRepo.findByEmailAndPassword(client.getEmail(), client.getPassword());
        if (optionalClient.isPresent()) {
            return true;
        }
        return false;
    }
}
