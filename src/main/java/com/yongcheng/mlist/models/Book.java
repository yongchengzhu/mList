package com.yongcheng.mlist.models;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Book {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  private String title;

  private String cover;

  private String lastChapterRead;

  private Double rating;

  private Date lastReadDate;

  private Integer daysToWait;

  @Column(length = 250)
  private String comments;

  private String status;

  @ManyToOne(targetEntity = User.class, fetch = FetchType.EAGER)
  @JoinColumn(nullable = false, name = "user_id")
  private User user;

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getCover() {
    return cover;
  }

  public void setCover(String cover) {
    this.cover = cover;
  }

  public String getLastChapterRead() {
    return lastChapterRead;
  }

  public void setLastChapterRead(String lastChapterRead) {
    this.lastChapterRead = lastChapterRead;
  }

  public Double getRating() {
    return rating;
  }

  public void setRating(Double rating) {
    this.rating = rating;
  }

  public Date getLastReadDate() {
    return lastReadDate;
  }

  public void setLastReadDate(Date lastReadDate) {
    this.lastReadDate = lastReadDate;
  }

  public User getUser() {
    return user;
  }

  public void setUser(User user) {
    this.user = user;
  }

  public Book() {}

  public Book(String title, String cover, String lastChapterRead, Double rating, Date lastReadDate,
      String status, Integer daysToWait, User user) {
    this.title = title;
    this.cover = cover;
    this.lastChapterRead = lastChapterRead;
    this.rating = rating;
    this.lastReadDate = lastReadDate;
    this.status = status;
    this.daysToWait = daysToWait;
    this.user = user;
  }

  public Book(Long id, String title, String cover, String lastChapterRead, Double rating,
      Date lastReadDate, String status, Integer daysToWait, User user) {
    this.id = id;
    this.title = title;
    this.cover = cover;
    this.lastChapterRead = lastChapterRead;
    this.rating = rating;
    this.lastReadDate = lastReadDate;
    this.status = status;
    this.daysToWait = daysToWait;
    this.user = user;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getComments() {
    return comments;
  }

  public void setComments(String comments) {
    this.comments = comments;
  }

  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }

  public Integer getDaysToWait() {
    return daysToWait;
  }

  public void setDaysToWait(Integer daysToWait) {
    this.daysToWait = daysToWait;
  }
  
}