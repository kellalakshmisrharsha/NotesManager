package com.app.service;

import com.app.dto.RegistrationRequest;
import com.app.model.User;
import com.app.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    
    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Simple login without JWT / password hashing
    public User login(String email, String password) {
        User user = userRepository.findByEmail(email)
                     .orElseThrow(() -> new RuntimeException("User not found"));

        if (!password.equals(user.getPasswordHash())) { // comparing raw password
            throw new RuntimeException("Invalid credentials");
        }

        return user; // returning user instead of JWT
    }

    // Simple register without hashing or JWT
    public User register(RegistrationRequest request) {
        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPasswordHash(request.getPassword()); // storing plain password

        return userRepository.save(user);
    }
}
