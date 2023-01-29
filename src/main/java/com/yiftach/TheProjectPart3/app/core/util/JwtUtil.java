package com.yiftach.TheProjectPart3.app.core.util;

import com.yiftach.TheProjectPart3.app.core.data.Role;
import com.yiftach.TheProjectPart3.app.core.entities.Client;
import com.yiftach.TheProjectPart3.app.core.exceptions.CouponSystemException;
import com.yiftach.TheProjectPart3.app.core.repositories.ClientRepo;
import com.yiftach.TheProjectPart3.app.core.services.ClientService;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class JwtUtil extends JwtUtilAbstract<Client, Integer>{

    @Override
    public String generateToken(Client client) throws CouponSystemException {
        Map<String,Object> claims = new HashMap<>();
        claims.put("name",client.getName());
        claims.put("client_id",client.getClientId());
        claims.put("email",client.getEmail());
        claims.put("role",client.getRole().name());
        return this.createToken(claims, client.getId());
    }

    @Override
    public Client extractClient(String token) throws CouponSystemException {
        Claims claims = this.extractAllClaims(token);
        return new Client(Integer.parseInt(claims.getSubject()), claims.get("client_id", Integer.class),
                claims.get("name",String.class), claims.get("email", String.class),
                Role.valueOf(claims.get("role", String.class)));
    }
}
