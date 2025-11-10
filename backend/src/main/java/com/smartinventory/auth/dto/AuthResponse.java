package com.smartinventory.auth.dto;

import com.smartinventory.users.dto.UserResponse;

public record AuthResponse(String token, UserResponse user) {
}

