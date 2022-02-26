package com.ndiritu.Service;

import com.ndiritu.Dto.VoteDto;
import com.ndiritu.Entity.Post;
import com.ndiritu.Entity.Vote;
import com.ndiritu.Exceptions.PostNotFountException;
import com.ndiritu.Exceptions.SpringRedditException;
import com.ndiritu.Repository.PostRepository;
import com.ndiritu.Repository.VoteRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static com.ndiritu.Entity.VoteType.UPVOTE;

@Slf4j
@Service
@AllArgsConstructor
public class VoteService {

  private final VoteRepository voteRepository;
 private final PostRepository postRepository;
 private final AuthService authService;
  @Transactional
  public void vote(VoteDto voteDto) {
      Post post = postRepository.findById(voteDto.getPostId()).orElseThrow(() -> new PostNotFountException("post not found with post id " + voteDto.getPostId()));
      log.info("logginf post {}", post);

      Optional<Vote> voteByPostanduser = voteRepository.findTopByPostAndUserOrderByIdDesc(post, authService.getCurrentUser());
//      log.info("logginf findTopByPostAnUserOrderByIdDesc {}", voteByPostanduser);
//      log.info("loggin voteByPostanduser {}", voteByPostanduser.get());
      if (voteByPostanduser.isPresent() && voteByPostanduser.get().getVoteType().equals(voteDto.getVoteType())) {
          throw new SpringRedditException("you've already " + voteDto.getVoteType() + " for this post");
      }
      if (UPVOTE.equals(voteDto.getVoteType())) {
          post.setVoteCount(post.getVoteCount() + 1);
      } else {
          post.setVoteCount(post.getVoteCount() - 1);
      }
      voteRepository.save(mapToVote(voteDto, post));
      postRepository.save(post);
  }

    private Vote mapToVote(VoteDto voteDto, Post post) {
        return Vote.builder()
                .voteType(voteDto.getVoteType())
                .post(post)
                .user(authService.getCurrentUser())
                .build();
  }
}
