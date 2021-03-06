package com.yongcheng.mlist.sevices;

import com.yongcheng.mlist.components.JwtTokenUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

  @Autowired
  private AuthenticationManager authenticationManager;

  @Autowired 
  private JwtUserDetailsService jwtUserDetailsService;

  @Autowired
  private JwtTokenUtil jwtTokenUtil;
  
  public String authenticateUser(String emailOrUsername, String password) throws
    DisabledException, LockedException, BadCredentialsException {
      try {
        authenticationManager.authenticate(
          new UsernamePasswordAuthenticationToken(emailOrUsername, password));
      } catch (DisabledException ex) {
        throw new DisabledException("Your account is not enabled.", ex);
      } catch (LockedException ex) {
        throw new LockedException("Your account is locked.", ex);
      } catch (BadCredentialsException ex) {
        throw new BadCredentialsException("Wrong username/email or password.", ex);
      }

      UserDetails userDetails = jwtUserDetailsService.loadUserByUsername(emailOrUsername);
      
      return jwtTokenUtil.generateToken(userDetails);
  }

}