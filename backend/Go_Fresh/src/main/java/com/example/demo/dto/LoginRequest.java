package com.example.demo.dto;


public class LoginRequest {

    private String emailOrUsername;
    private String password;
    //private String role;   // 👈 FROM DROPDOWN

    public String getEmailOrUsername() {
        return emailOrUsername;
    }

    public String getPassword() {
        return password;
    }

	public void setEmailOrUsername(String emailOrUsername) {
		this.emailOrUsername = emailOrUsername;
	}

	public void setPassword(String password) {
		this.password = password;
	}

    /*public String getRole() {
        return role;
    }*/
    
    
}
