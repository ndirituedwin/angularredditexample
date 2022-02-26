package com.ndiritu.Service;

import com.ndiritu.Exceptions.SpringRedditException;
import com.ndiritu.Repository.RefreshTokenRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.UUID;

@Service
@Transactional
@Slf4j
@AllArgsConstructor
public class RefreshToken {
 private final RefreshTokenRepository refreshTokenRepository;
    public com.ndiritu.Entity.RefreshToken generateRefreshToken(){
        com.ndiritu.Entity.RefreshToken refreshToken=new com.ndiritu.Entity.RefreshToken();
        refreshToken.setToken(UUID.randomUUID().toString());
        refreshToken.setCreatedDate(Instant.now());
       return refreshTokenRepository.save(refreshToken);
    }

    public void validateRefreshtoken(String token){
        refreshTokenRepository.findByToken(token).orElseThrow(() -> new SpringRedditException("token not found"));
    }
   public void deleteToken(String token){
        refreshTokenRepository.deleteByToken(token);
   }
}
