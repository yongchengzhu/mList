package com.yongcheng.mlist.repositories;

import com.yongcheng.mlist.models.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
  
  User findByEmail(String email);

  User findByEmailOrUsername(String email, String username);
  
}