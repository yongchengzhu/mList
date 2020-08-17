package com.yongcheng.mlist.validators;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class StatusValidator implements ConstraintValidator<Status, String> {

  private static final List<String> validStatus = 
    Arrays.asList("reading", "completed", "dropped", "axed", "planned");

  @Override
  public boolean isValid(String value, ConstraintValidatorContext context) {
    Set<String> validSet = new HashSet<String>(validStatus);
    return value != null && validSet.contains(value.toLowerCase()); 
  }
  
}