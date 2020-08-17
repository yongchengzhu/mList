package com.yongcheng.mlist.payloads;

public class SigninResponse {
  
  private String token;

  public SigninResponse(String token) {
    this.token = token;
  }

  public String getToken() {
    return token;
  }

  public void setToken(String token) {
    this.token = token;
  }

}