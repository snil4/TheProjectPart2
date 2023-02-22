package com.yiftach.TheProjectPart3.app.core.util;

import com.yiftach.TheProjectPart3.app.core.exceptions.CouponSystemException;
import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

import javax.annotation.PostConstruct;
import javax.crypto.spec.SecretKeySpec;
import java.security.Key;
import java.sql.Date;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Base64;
import java.util.Map;

public abstract class JwtUtilAbstract<T,ID> {

    private String algorithm = SignatureAlgorithm.HS256.getJcaName();
    @Value("${jwt.util.secret}")
    private String secret;
    @Value("${jwt.util.chrono.unit}")
    private String chronoUnit;
    @Value("${jwt.util.chrono.number}")
    private long chronoNumber;
    private Key key;
    private JwtParser jwtParser;

    @PostConstruct
    void init() {
        this.key = new SecretKeySpec(Base64.getDecoder().decode(secret),algorithm);
        jwtParser = Jwts.parserBuilder().setSigningKey(this.key).build();
    }

    public abstract String generateToken(T client) throws CouponSystemException;

    public String createToken(Map<String, Object> claims,ID id) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(id.toString())
                .setIssuedAt(Date.from(Instant.now()))
                .setExpiration(Date.from(Instant.now().plus(chronoNumber, ChronoUnit.valueOf(chronoUnit))))
                .signWith(key)
                .compact();
    }

    public abstract T extractClient(String token) throws CouponSystemException;

    public Claims extractAllClaims(String token) throws JwtException{
        return jwtParser.parseClaimsJws(token).getBody();
    }
}
