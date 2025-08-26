package com.app.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.dto.RegistrationRequest;
import com.app.model.User;

public interface UserRepository extends JpaRepository<User,UUID>{
	Optional<User> findByEmail(String email);

}
