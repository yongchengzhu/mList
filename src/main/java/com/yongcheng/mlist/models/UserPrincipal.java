package com.yongcheng.mlist.models;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public class UserPrincipal implements UserDetails {

  private static final long serialVersionUID = 1L;

  Collection<? extends GrantedAuthority> authorities;

  private String password;

  private String username;

  private String email;

  private Boolean enabled;

  public UserPrincipal(String username, String password, Boolean enabled) {
    this.password = password;
    this.username = username;
    this.enabled = enabled;
  }

  public UserPrincipal(String email, String username, String password, Boolean enabled) {
    this.email = email;
    this.password = password;
    this.username = username;
    this.enabled = enabled;
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return null;
  }

  @Override
  public String getPassword() {
    return password;
  }

  @Override
  public String getUsername() {
    return username;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return enabled;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }
  
}