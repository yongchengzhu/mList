package com.yongcheng.mlist.validators;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import javax.validation.Constraint;
import javax.validation.Payload;

@Documented
@Constraint(validatedBy = StatusValidator.class)
@Target({ ElementType.METHOD, ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
public @interface Status {

  String message() default 
  "Status must be either: Reading | Completed | Dropped | Axed | Planned";

  Class<?>[] groups() default{};

  Class<? extends Payload>[] payload() default {};
  
}