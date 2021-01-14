package com.yongcheng.mlist.payloads;

import java.util.Date;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.yongcheng.mlist.validators.Rating;
import com.yongcheng.mlist.validators.Status;

public class CreateBookRequest {
  
  @NotBlank(message = "Title field cannot be empty.")
  private String title;

  private String author;

  private String cover;

  @NotBlank(message = "Last Chapter Read field cannot be empty.")
  private String lastChapterRead;

  @Rating
  private Double rating;

  // Todos:
  // - Replace @JsonFormat with custom validator @TimezonelessDate
  @JsonFormat(pattern = "dd-MM-yyyy hh:mm:ss")
  private Date lastReadDate;

  @Size(max = 250, message = "Maximum comment length is 250.")
  private String comment;

  @Status
  private String status;

  @Min(value = 0, message = "Day count cannot be less than 0.")
  private Integer daysToWait;

  public Integer getDaysToWait() {
    return daysToWait;
  }

  public void setDaysToWait(Integer daysToWait) {
    this.daysToWait = daysToWait;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getAuthor() {
    return author;
  }

  public void setAuthor(String author) {
    this.author = author;
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

  public String getComment() {
    return comment;
  }

  public void setComment(String comment) {
    this.comment = comment;
  }

  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }

}