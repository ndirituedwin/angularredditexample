package com.ndiritu.security;

import com.ndiritu.Exceptions.SpringRedditException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.io.InputStream;
import java.security.*;
import java.security.cert.CertificateException;
import java.time.Instant;
import java.util.Date;

import static io.jsonwebtoken.Jwts.parser;

@Service
@Slf4j
public class JwtProvider {

 private KeyStore keyStore;
    @Value("${jwt.expiration.time}")
    private Long jwtExpirationInMillis;
    @PostConstruct
    public void init(){
        try{
            keyStore=KeyStore.getInstance("JKS");
            log.info("load keystore {}",keyStore);
            InputStream resourceStream=getClass().getResourceAsStream("/springblog.jks");
            keyStore.load(resourceStream,"secret".toCharArray());
            log.info("loading resourcestream {}",resourceStream);
        }catch (KeyStoreException | CertificateException | NoSuchAlgorithmException | IOException e){
            throw new SpringRedditException("Exception occurred while loading keystore");
        }
    }
 public String generateToken(Authentication authentication){
     User principal= (User) authentication.getPrincipal();
     log.info("logging user principal {}",principal);
     log.info("logging user principal username{}",principal.getUsername());
     log.info("logging user principal authorities {}",principal.getAuthorities());
     return Jwts.builder()
             .setSubject(principal.getUsername())
             .setIssuedAt(Date.from(Instant.now()))
             .signWith(privateKey())
             .setExpiration(Date.from(Instant.now().plusMillis(jwtExpirationInMillis)))
             .compact();
 }

    private Key privateKey() {
        try {
            log.info("alaaaah private key {}", keyStore.getKey("springblog","secret".toCharArray()));
            return (PrivateKey) keyStore.getKey("springblog","secret".toCharArray());
        }catch (KeyStoreException|NoSuchAlgorithmException| UnrecoverableKeyException e){
            throw new SpringRedditException("Exception occurred while retrieving public key from the keystore");

        }
    }
    public boolean validateToken(String jwt){
        parser().setSigningKey(getpublickey()).parseClaimsJws(jwt);
          return true;
    }

    private PublicKey getpublickey() {
        try {
                return keyStore.getCertificate("springblog").getPublicKey();
        }catch (KeyStoreException exception){
            throw new SpringRedditException("An exception occurred while retrieving pubick key from the keystore");
        }
    }
    public  String getusernamefromjwt(String token){
        Claims claims=parser().setSigningKey(getpublickey()).parseClaimsJws(token).getBody();
          log.info("loading claims from jwt {}",claims);
        log.info("loading claims subject from jwt {}",claims.getSubject());
        return  claims.getSubject();

    }
   public Long getJwtExpirationInMillis(){
        return  jwtExpirationInMillis;
   }

    public String generatetokenwithusername(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(Date.from(Instant.now()))
                .signWith(getprivatekey())
                .setExpiration(Date.from(Instant.now().plusMillis(jwtExpirationInMillis)))
                .compact();
    }

    private Key getprivatekey() {
        try{
            return keyStore.getKey("springblog","secret".toCharArray());
        }catch (KeyStoreException| NoSuchAlgorithmException| UnrecoverableKeyException e){
            throw new SpringRedditException("Exception occured while retrieving private key from the keystore");
        }
    }
}
