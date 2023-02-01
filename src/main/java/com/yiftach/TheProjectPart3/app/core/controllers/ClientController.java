package com.yiftach.TheProjectPart3.app.core.controllers;

import com.yiftach.TheProjectPart3.app.core.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

public abstract class ClientController {
    public abstract ResponseEntity<String> login(String email, String password);
}
