package com.yongcheng.mlist.payloads;

import javax.validation.constraints.NotBlank;

public class SigninRequest {

  @NotBlank(message = "Email/Username is mandatory.")
  private String emailOrUsername;

  @NotBlank(message = "Password is mandatory.")
  private String password;

  public String getEmailOrUsername() {
    return emailOrUsername;
  }

  public void setEmailOrUsername(String emailOrUserName) {
    this.emailOrUsername = emailOrUserName;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }
  
}