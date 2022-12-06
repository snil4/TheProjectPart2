package com.yiftach.TheProjectPart2.app.core.services;

import com.yiftach.TheProjectPart2.app.core.exceptions.CouponSystemException;

public abstract class ClientService {

    /**
     * @param email The email of the client
     * @param password The password of the client
     * @return True if the login went successfully
     * @throws CouponSystemException In case of a connection error
     */
    public boolean login(String email, String password) throws CouponSystemException {return false;}
}
