package com.yongcheng.mlist.models;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name="`user`")
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @Column(unique = true)
  private String email;

  @Column(unique = true)
  private String username;

  @Column(length = 60) // BCrypt generates a password of length 60.
  private String password;

  private Boolean enabled;

  @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
  private List<Book> books;

  @OneToOne(mappedBy = "user", cascade = CascadeType.REMOVE)
  private VerificationToken verificationToken;

  public User() {}

  public User(String email, String username, String password) {
    this.email = email;
    this.username = username;
    this.password = password;
    this.enabled = false;
  }

  public User(String email, String password, Boolean enabled) {
    this.email = email;
    this.password = password;
    this.enabled = enabled;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public Boolean getEnabled() {
    return enabled;
  }

  public void setEnabled(Boolean enabled) {
    this.enabled = enabled;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }
  
}