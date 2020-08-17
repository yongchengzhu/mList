package com.yongcheng.mlist.validators;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class RatingValidator implements ConstraintValidator<Rating, Double> {
  private static final List<Double> validRatings = 
    Arrays.asList(0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0);

  @Override
  public void initialize(Rating constraintAnnotation) {
  }

  @Override
  public boolean isValid(Double value, ConstraintValidatorContext context) {
    Set<Double> validSet = new HashSet<Double>(validRatings);

    return validSet.contains(value);
  }
  
}