package com.smartinventory.auth;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.smartinventory.auth.dto.AuthResponse;
import com.smartinventory.auth.dto.LoginRequest;
import com.smartinventory.auth.dto.RegisterRequest;
import com.smartinventory.users.User;
import com.smartinventory.users.UserRole;
import com.smartinventory.users.UserService;
import com.smartinventory.users.dto.UserResponse;

@Service
public class AuthService {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthService(
        UserService userService,
        PasswordEncoder passwordEncoder,
        JwtService jwtService,
        AuthenticationManager authenticationManager
    ) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    public AuthResponse register(RegisterRequest request) {
        String email = request.email().trim().toLowerCase();

        if (userService.emailExists(email)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email is already registered");
        }

        UserRole role = request.role() != null ? request.role() : UserRole.STAFF;
        User user = User.of(
            email,
            passwordEncoder.encode(request.password()),
            role
        );

        User saved = userService.save(user);
        String token = jwtService.generateToken(saved);
        return new AuthResponse(token, UserResponse.from(saved));
    }

    public AuthResponse login(LoginRequest request) {
        String email = request.email().trim().toLowerCase();

        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(email, request.password())
        );

        Object principal = authentication.getPrincipal();
        if (!(principal instanceof User user)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Authentication failed");
        }

        String token = jwtService.generateToken(user);
        return new AuthResponse(token, UserResponse.from(user));
    }
}

