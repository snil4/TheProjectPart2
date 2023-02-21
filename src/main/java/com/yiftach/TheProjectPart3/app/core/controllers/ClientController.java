package com.yiftach.TheProjectPart3.app.core.controllers;

import com.yiftach.TheProjectPart3.app.core.data.Login;
import org.springframework.http.ResponseEntity;

public abstract class ClientController {
    public abstract ResponseEntity<String> login(Login login);
}
