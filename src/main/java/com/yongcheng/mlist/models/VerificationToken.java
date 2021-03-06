package com.yongcheng.mlist.models;

import java.util.Calendar;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

@Entity
public class VerificationToken {

  private static final int EXPIRATION = 60 * 24;
  
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  private String token;

  private Date expiraryDate;

  @OneToOne(targetEntity = User.class, fetch = FetchType.EAGER)
  @JoinColumn(nullable = false, name = "user_id")
  private User user;

  public VerificationToken() {}

  private Date calculateExpiraryDate(int expiraryTimeInMinutes) {
    Calendar calendar = Calendar.getInstance();
    
    calendar.setTime(new Date());
    calendar.add(Calendar.MINUTE, expiraryTimeInMinutes);

    return calendar.getTime();
  }

  public VerificationToken(String token, User user) {
    this.token = token;
    this.user = user;
    this.expiraryDate = calculateExpiraryDate(EXPIRATION);
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getToken() {
    return token;
  }

  public void setToken(String token) {
    this.token = token;
  }

  public Date getExpiraryDate() {
    return expiraryDate;
  }

  public void setExpiraryDate(Date expiraryDate) {
    this.expiraryDate = expiraryDate;
  }

  public User getUser() {
    return user;
  }

  public void setUser(User user) {
    this.user = user;
  }

}