package com.smartinventory.users.dto;

import com.smartinventory.users.User;
import com.smartinventory.users.UserRole;

public record UserResponse(String id, String email, UserRole role) {

    public static UserResponse from(User user) {
        return new UserResponse(user.getId(), user.getEmail(), user.getRole());
    }
}

