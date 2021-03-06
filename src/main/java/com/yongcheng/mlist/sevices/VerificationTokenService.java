package com.yongcheng.mlist.sevices;

import java.time.Instant;
import java.util.Calendar;
import java.util.Date;

import javax.transaction.Transactional;

import com.yongcheng.mlist.exceptions.TokenInvalidException;
import com.yongcheng.mlist.exceptions.TokenNotFoundException;
import com.yongcheng.mlist.models.User;
import com.yongcheng.mlist.models.VerificationToken;
import com.yongcheng.mlist.repositories.UserRepository;
import com.yongcheng.mlist.repositories.VerificationTokenRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class VerificationTokenService {
  
  @Autowired
  private VerificationTokenRepository verificationTokenRepository;

  @Autowired
  private UserRepository userRepository;

  public void save(VerificationToken token) {
    verificationTokenRepository.save(token);
  }

  public void confirm(String candidateToken) {
    VerificationToken token = verificationTokenRepository.findByToken(candidateToken);

    if (!tokenExists(token)) {
      throw new TokenNotFoundException("Verification token is not valid: " + candidateToken);
    } else if (tokenExpired(token)) {
      throw new TokenInvalidException("Verification token is expired: " + candidateToken);
    }
    else {
      User user = token.getUser();

      if (tokenUsed(user)) {
        throw new TokenInvalidException("Verification token already used: " + candidateToken);
      }

      user.setEnabled(true);

      userRepository.save(user);
    }
  }

  public boolean tokenExists(VerificationToken token) {
    return token != null;
  }

  public boolean tokenExpired(VerificationToken token) {
    return token.getExpiraryDate().getTime() - Calendar.getInstance().getTime().getTime() <= 0;
  }

  public boolean tokenUsed(User user) {
    return user.getEnabled();
  }

  @Scheduled(cron = "${cron.purgeExpired}")
  public void purgeExpired() {
    Date now = Date.from(Instant.now());
    verificationTokenRepository.deleteAllExpiredSince(now);
  }

}