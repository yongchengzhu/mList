package com.yongcheng.mlist.handlers;

import java.util.HashMap;
import java.util.Map;

import com.yongcheng.mlist.exceptions.TokenInvalidException;
import com.yongcheng.mlist.exceptions.TokenNotFoundException;
import com.yongcheng.mlist.exceptions.UserAlreadyExistException;
import com.yongcheng.mlist.payloads.ExceptionResponse;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.LockedException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class RestResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {
  
  public RestResponseEntityExceptionHandler() {
    super();
  }

  @Override
  protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
      HttpHeaders headers, HttpStatus status, WebRequest request) {
    Map<String, String> errors = new HashMap<>();
    ex.getBindingResult().getAllErrors().forEach((error) -> {
        String fieldName = ((FieldError) error).getField();
        String errorMessage = error.getDefaultMessage();
        errors.put(fieldName, errorMessage);
    });
    return new ResponseEntity<Object>(errors, HttpStatus.BAD_REQUEST);
  }

  @ExceptionHandler({ UserAlreadyExistException.class })
  public ResponseEntity<?> handleBadRequest(final RuntimeException ex) {
    final String error      = "Bad Request";
    final String exception  = ex.getClass().getName();
    final String message    = ex.getMessage();
    final HttpStatus status = HttpStatus.BAD_REQUEST;
    
    return new ResponseEntity<>(new ExceptionResponse(error, exception, message), status);
  }

  @ExceptionHandler({ RuntimeException.class })
  public ResponseEntity<?> handleInternalServerError(final RuntimeException ex) {
    final String error      = "Internal Server Error";
    final String exception  = "RuntimeException";
    final String message    = ex.getMessage();
    final HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;

    return new ResponseEntity<>(new ExceptionResponse(error, exception, message), status);
  }

  @ExceptionHandler({ TokenNotFoundException.class })
  public ResponseEntity<?> handleNotFound(final RuntimeException ex) {
    final String error      = "Not Found";
    final String exception  = "TokenNotFoundException";
    final String message    = ex.getMessage();
    final HttpStatus status = HttpStatus.NOT_FOUND;

    return new ResponseEntity<>(new ExceptionResponse(error, exception, message), status);
  }

  @ExceptionHandler({ TokenInvalidException.class })
  public ResponseEntity<?> handleInvalidToken(final RuntimeException ex) {
    final String error      = "Invalid Token";
    final String exception  = "TokenInvalidException";
    final String message    = ex.getMessage();
    final HttpStatus status = HttpStatus.UNAUTHORIZED;

    return new ResponseEntity<>(new ExceptionResponse(error, exception, message), status);
  }

  @ExceptionHandler({ DisabledException.class, LockedException.class, BadCredentialsException.class })
  public ResponseEntity<?> handleUnauthorized(final RuntimeException ex) {
    final String error = "Unauthorized Request";
    final String exception = ex.getCause().toString();
    final String message = ex.getMessage();
    final HttpStatus status = HttpStatus.UNAUTHORIZED;

    return new ResponseEntity<>(new ExceptionResponse(error, exception, message), status);
  }

}