package com.ndiritu.Dto;

import com.ndiritu.Entity.VoteType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class VoteDto {

    private VoteType voteType;
    private Long postId;
}
