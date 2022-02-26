package com.ndiritu.Entity;

import lombok.*;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.NotBlank;
import java.time.Instant;

import static javax.persistence.FetchType.LAZY;

@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank(message = "post name cannot be empty or blank")
    private String name;

    private String url;

    @Nullable
    private String description;
    private Integer voteCount=0;

    @ManyToOne(fetch = LAZY)
    private User user;

    private Instant createdDate;

    @ManyToOne(fetch = LAZY)
    private Subreddit subreddit;

}
