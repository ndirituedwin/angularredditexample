package com.ndiritu.Dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.Instant;

@Data
@AllArgsConstructor
@Builder
public class CommentDto {

    private Long id;
    private Long postId;
    private Instant createdDate;
    private String text;
    private String username;
}
