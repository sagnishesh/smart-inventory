package com.smartinventory.auth;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class JwtProperties {

    private final String secret;
    private final long expirationMs;

    public JwtProperties(
        @Value("${jwt.secret}") String secret,
        @Value("${jwt.expiration-ms}") long expirationMs
    ) {
        this.secret = secret;
        this.expirationMs = expirationMs;
    }

    public String secret() {
        return secret;
    }

    public long expirationMs() {
        return expirationMs;
    }
}

