package com.yiftach.TheProjectPart3.app.core.util;

import com.yiftach.TheProjectPart3.app.core.data.Role;
import com.yiftach.TheProjectPart3.app.core.entities.Client;
import io.jsonwebtoken.Claims;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class JwtUtil extends JwtUtilAbstract<Client, Integer>{

    @Override
    public String generateToken(Client client) {
        Map<String,Object> claims = new HashMap<>();
        claims.put("name",client.getName());
        claims.put("email",client.getEmail());
        claims.put("role",client.getRole());
        return this.createToken(claims, client.getId());
    }

    @Override
    public Client extractClient(String token) {
        Claims claims = this.extractAllClaims(token);
        return new Client(Integer.parseInt(claims.getSubject()),
                claims.get("name",String.class), claims.get("email", String.class),
                Role.valueOf(claims.get("role", String.class)));
    }
}
