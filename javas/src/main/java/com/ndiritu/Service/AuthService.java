package com.ndiritu.Service;
import com.ndiritu.Dto.AuthenticationResponse;
import com.ndiritu.Dto.LoginRequest;
import com.ndiritu.Dto.RefreshTokenRequest;
import com.ndiritu.Dto.RegisterRequest;
import com.ndiritu.Entity.NotificationEmail;
import com.ndiritu.Entity.User;
import com.ndiritu.Entity.VerificationToken;
import com.ndiritu.Exceptions.SpringRedditException;
import com.ndiritu.Repository.UserRepository;
import com.ndiritu.Repository.VerificationTokenRepository;
import com.ndiritu.config.AppConfig;
import com.ndiritu.security.JwtProvider;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
@Slf4j
public class AuthService {

    private static final String subject="Please activate your account";
    private static final String  body="Thank you for signing up to the reddit clone application,click on the link below to verify your account";
    private final BCryptPasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final VerificationTokenRepository verificationTokenRepository;
    private final MailService mailService;
    private final AuthenticationManager authenticationManager;
    private final JwtProvider jwtProvider;
    private final RefreshToken refreshTokenService;
    private  final AppConfig appConfig;
//    private static final String url=appConfig.getUrl()+"api/auth/accountverification/";
    @Transactional
    public void registeruser(RegisterRequest registerRequest) {
        User user=new User();
        user.setEmail(registerRequest.getEmail());
        user.setUsername(registerRequest.getUsername());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setEnabled(false);
        user.setCreatedDate(Instant.now());
        userRepository.save(user);
        String token=generateverificationToken(user);
        log.info("Logging the token before sending email to the user {} ",token);
        mailService.sendmail(new NotificationEmail(subject,user.getEmail(),body+"\n "+appConfig.getUrl()+"api/auth/accountverification/"+token));

    }

    private String  generateverificationToken(User user) {
      String token= UUID.randomUUID().toString();
        VerificationToken verificationToken=new VerificationToken();
        verificationToken.setToken(token);
        verificationToken.setUser(user);
        log.info("Logging the user before saving verification token {}",user);
        verificationTokenRepository.save(verificationToken);
     return token;
    }


    @Transactional
    public void verifyaccount(String token) {
        Optional<VerificationToken> token1=verificationTokenRepository.findByToken(token);
                token1.orElseThrow(() -> new SpringRedditException("Token provided does not exists"));
           log.info("checking what verification token.get contains {}",token1.get());
                fetchuserandenable(token1.get());

    }


    @Transactional
    private void fetchuserandenable(VerificationToken verificationToken) {
       String username=verificationToken.getUser().getUsername();
       log.info("logging the token user {}",verificationToken.getUser());
       User user=userRepository.findByUsername(username).orElseThrow(() -> new SpringRedditException("user not found with username "+username));
       user.setEnabled(true);
       userRepository.save(user);
    }

    public AuthenticationResponse login(LoginRequest loginRequest) {
        Authentication authenticate= authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(),loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authenticate);
//        log.info(SecurityContextHolder.getContext().setAuthentication(authenticate));
        log.info("authentication  ->",authenticate.getPrincipal());
        System.out.println("authentication  ->  "+authenticate.getPrincipal());
        String token= jwtProvider.generateToken(authenticate);
//       return new AuthenticationResponse(token,loginRequest.getUsername(),);
        return AuthenticationResponse.builder()
                .authenticationToken(token)
                .refreshToken(refreshTokenService.generateRefreshToken().getToken())
                .expiresAt(Instant.now().plusMillis(jwtProvider.getJwtExpirationInMillis()))
                .username(loginRequest.getUsername())
                .build();
    }

    @Transactional(readOnly = true)
    public User getCurrentUser() {
        org.springframework.security.core.userdetails.User principal= (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();
        return userRepository.findByUsername(principal.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("user name "+principal.getUsername()+" not found"));

    }

    public boolean isLoggedIn() {
        Authentication authentication=SecurityContextHolder.getContext().getAuthentication();
        return !(authentication instanceof AnonymousAuthenticationToken && authentication.isAuthenticated());
    }

    public AuthenticationResponse refreshToken(RefreshTokenRequest refreshTokenRequest) {
        refreshTokenService.validateRefreshtoken(refreshTokenRequest.getRefreshToken());
       String token=jwtProvider.generatetokenwithusername(refreshTokenRequest.getUsername());
       return AuthenticationResponse.builder()
               .authenticationToken(token)
               .refreshToken(refreshTokenRequest.getRefreshToken())
               .expiresAt(Instant.now().plusMillis(jwtProvider.getJwtExpirationInMillis()))
               .username(refreshTokenRequest.getUsername())
               .build();
    }
}
