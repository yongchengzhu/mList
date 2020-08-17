package com.yongcheng.mlist.validators;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import javax.validation.Constraint;
import javax.validation.Payload;

@Documented
@Constraint(validatedBy = RatingValidator.class)
@Target({ ElementType.METHOD, ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
public @interface Rating {

  String message() default 
    "Rating must be either: 0.5, 1.0, 1.5, 2.0, ..., 5.0";
  
  Class<?>[] groups() default{};

  Class<? extends Payload>[] payload() default {};

}