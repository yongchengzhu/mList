package com.yongcheng.mlist.controllers;

import java.util.List;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import com.yongcheng.mlist.events.OnRegistrationCompleteEvent;
import com.yongcheng.mlist.models.User;
import com.yongcheng.mlist.payloads.SigninRequest;
import com.yongcheng.mlist.payloads.SigninResponse;
import com.yongcheng.mlist.payloads.SignupRequest;
import com.yongcheng.mlist.sevices.AuthService;
import com.yongcheng.mlist.sevices.UserService;
import com.yongcheng.mlist.sevices.VerificationTokenService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@RequestMapping("/api/user")
public class UserController {
  
  @Autowired
  private UserService userService;

  @Autowired
  private VerificationTokenService tokenService;

  @Autowired
  private AuthService authService;

  @Autowired
  private ApplicationEventPublisher eventPublisher;

  @DeleteMapping("/{id}")
  @ResponseStatus(HttpStatus.OK)
  public void deleteAccount(@PathVariable Long id) {
    userService.delete(id);
  }

  @PostMapping("/signup")
  @ResponseStatus(HttpStatus.CREATED)
  public void signup(@RequestBody @Valid SignupRequest signupRequest, HttpServletResponse res, UriComponentsBuilder uriBuilder) {
    final String email    = signupRequest.getEmail();
    final String username = signupRequest.getUsername();
    final String password = signupRequest.getPassword();
    final User   user     = new User(email, username, password);
    final String baseURL  = uriBuilder.path("").toUriString();

    final OnRegistrationCompleteEvent event = 
      new OnRegistrationCompleteEvent(user, baseURL.toString());

    userService.save(user);

    eventPublisher.publishEvent(event);

    res.addHeader("Location", baseURL + "/" + user.getId());
  }

  @PutMapping("/confirm")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void confirmSignup(@RequestParam("token") String token) {
    tokenService.confirm(token);
  }

  @PostMapping("/signin")
  @ResponseStatus(HttpStatus.OK)
  public SigninResponse signin(@RequestBody @Valid SigninRequest signinRequest) throws Exception {
    final String emailOrUsername = signinRequest.getEmailOrUsername();
    final String password = signinRequest.getPassword();

    String token = authService.authenticateUser(emailOrUsername, password);

    return new SigninResponse(token);
  }

  @GetMapping
  @ResponseStatus(HttpStatus.OK)
  public List<User> findAllUsers() {
    return userService.findAll();
  }
  
}