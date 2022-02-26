package com.ndiritu.Entity;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import static javax.persistence.FetchType.LAZY;

@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Subreddit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank(message = "commnunity name is required")
    private String name;
    @NotBlank(message = "description is required")
    private String description;
    @OneToMany(fetch = LAZY)
//    @JoinColumn(name = "subreddit_id")
    private List<Post> posts=new ArrayList<>(0);
    private Instant createdDate;
    @ManyToOne(fetch = LAZY)
    private User user;
}
