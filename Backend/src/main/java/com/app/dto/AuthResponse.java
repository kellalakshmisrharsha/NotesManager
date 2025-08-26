package com.app.dto;
import java.util.UUID;
public class AuthResponse {
    private String token;
    private UUID userId;
    private String email;
	public AuthResponse(String jwt, UUID id, String email2) {
		// TODO Auto-generated constructor stub
	}
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
	public UUID getUserId() {
		return userId;
	}
	public void setUserId(UUID userId) {
		this.userId = userId;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
    
    // (Include constructor, getters, and setters)
}