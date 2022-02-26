package com.ndiritu.Controller;

import com.ndiritu.Dto.AuthenticationResponse;
import com.ndiritu.Dto.LoginRequest;
import com.ndiritu.Dto.RefreshTokenRequest;
import com.ndiritu.Dto.RegisterRequest;
import com.ndiritu.Service.AuthService;
import com.ndiritu.Service.RefreshToken;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
public class AuthController {
    private final AuthService authService;
    private final RefreshToken refreshToken;
     @PostMapping("/signup")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest registerRequest){
         authService.registeruser(registerRequest);
         return new ResponseEntity<>("User registration successful",HttpStatus.OK);
     }
     @PostMapping("/login")
     public AuthenticationResponse LoginRequest(@Valid @RequestBody LoginRequest loginRequest){
         return authService.login(loginRequest);
//         return new ResponseEntity<>(Ht)
     }

     @GetMapping("/accountverification/{token}")
    public ResponseEntity<String >verifyaccount(@PathVariable("token") String token){

         authService.verifyaccount(token);
         return new ResponseEntity("Acccount verification successful",HttpStatus.OK);
     }
    @PostMapping("/refreshToken")
    public AuthenticationResponse authenticationResponse(@Valid @RequestBody RefreshTokenRequest refreshTokenRequest){
         return authService.refreshToken(refreshTokenRequest);
    }
    @PostMapping("/logout")
    public ResponseEntity<String> logoutanddeleterefreshtoken(@Valid @RequestBody RefreshTokenRequest refreshTokenRequest){
        refreshToken.deleteToken(refreshTokenRequest.getRefreshToken());
        return  ResponseEntity.status(HttpStatus.OK).body("Refresh Token successfully deleted");
    }
}
