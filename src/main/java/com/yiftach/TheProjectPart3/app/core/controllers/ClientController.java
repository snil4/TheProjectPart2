package com.yiftach.TheProjectPart3.app.core.controllers;

import org.springframework.http.ResponseEntity;

public abstract class ClientController {
    public abstract ResponseEntity<String> login(String email, String password);
}
