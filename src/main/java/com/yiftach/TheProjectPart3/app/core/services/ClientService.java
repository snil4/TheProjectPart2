package com.yiftach.TheProjectPart3.app.core.services;

import com.yiftach.TheProjectPart3.app.core.entities.Client;
import com.yiftach.TheProjectPart3.app.core.exceptions.CouponSystemException;
import com.yiftach.TheProjectPart3.app.core.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;

public abstract class ClientService {

    @Autowired
    private JwtUtil jwtUtil;

    /**
     * @return True if the login went successfully
     * @throws CouponSystemException In case of a connection error
     */
    public abstract String login(String email, String password) throws CouponSystemException;

    public String getToken(Client client) throws CouponSystemException{
        return jwtUtil.generateToken(client);
    }
}
