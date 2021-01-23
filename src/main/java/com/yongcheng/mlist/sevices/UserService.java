package com.yongcheng.mlist.sevices;

import java.util.List;

import javax.transaction.Transactional;

import com.yongcheng.mlist.exceptions.UserAlreadyExistException;
import com.yongcheng.mlist.exceptions.UsernameAlreadyExistException;
import com.yongcheng.mlist.models.User;
import com.yongcheng.mlist.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class UserService {

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private PasswordEncoder passwordEncoder;

  /**
   * Used by AuthenticationManager after invoking JwtUserDetailsService.
   * Hence, should throw BadCredential exception upon failure.
   * 
   * @param emailOrUserName
   * @return
   * @throws UsernameNotFoundException
   */
  public User getUser(String emailOrUserName) throws UsernameNotFoundException {
    User user = userRepository.findByEmailOrUsernameIgnoreCase(emailOrUserName, emailOrUserName);
    
    if (user == null) {
      throw new UsernameNotFoundException("Bad credentials: wrong username/email or password.");
    }

    return user;
  }

  public void save(User user) throws UserAlreadyExistException {
    if (emailExists(user.getEmail())) {
      throw new UserAlreadyExistException("Email already exists: " + user.getEmail());
    }

    if (usernameExists(user.getUsername())) {
      throw new UsernameAlreadyExistException("Username already exists: " + user.getUsername());
    }

    user.setPassword(passwordEncoder.encode(user.getPassword()));
    
    userRepository.save(user);
  }

  public void delete(Long id) {
    userRepository.deleteById(id);
  }

  public List<User> findAll() {
    return userRepository.findAll();
  }

  private boolean emailExists(String email) {
    return userRepository.findByEmail(email) != null;
  }

  private boolean usernameExists(String username) { return userRepository.findByUsernameIgnoreCase(username) != null; }

}