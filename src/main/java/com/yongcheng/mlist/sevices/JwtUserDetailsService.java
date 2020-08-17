package com.yongcheng.mlist.sevices;

import com.yongcheng.mlist.models.User;
import com.yongcheng.mlist.models.UserPrincipal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class JwtUserDetailsService implements UserDetailsService {

  @Autowired
  UserService userService;

  @Override
  public UserDetails loadUserByUsername(String emailOrUsername) throws UsernameNotFoundException {
    try {
      User user = userService.getUser(emailOrUsername);
      return new UserPrincipal(
        user.getEmail(), 
        user.getUsername(), 
        user.getPassword(), 
        user.getEnabled()
      );
    } catch (UsernameNotFoundException ex) {
      // The AuthenticationManager overwrites this message anyway.
      throw new UsernameNotFoundException(ex.getMessage(), ex);
    }
  }

}