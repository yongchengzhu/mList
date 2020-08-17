package com.yongcheng.mlist.payloads;

import javax.validation.constraints.NotNull;

public class UpdateBookRequest extends CreateBookRequest {

  @NotNull
  private Long id;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }
  
}