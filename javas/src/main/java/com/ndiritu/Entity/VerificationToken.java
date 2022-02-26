package com.ndiritu.Entity;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.time.Instant;

@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class VerificationToken {

     @Id
     @GeneratedValue(strategy = GenerationType.IDENTITY)
     private Long id;
     @NotEmpty(message = "verification token required")
     private String token;

     @OneToOne(fetch = FetchType.LAZY)
     private User user;
     private Instant expiryDate;
}
