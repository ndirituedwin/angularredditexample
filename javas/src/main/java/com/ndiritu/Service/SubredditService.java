package com.ndiritu.Service;

import com.ndiritu.Dto.SubredditDto;
import com.ndiritu.Entity.Subreddit;
import com.ndiritu.Entity.User;
import com.ndiritu.Exceptions.SpringRedditException;
import com.ndiritu.Repository.SubredditRepository;
import com.ndiritu.mapper.SubredditMapper;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@AllArgsConstructor
public class SubredditService {
 private final SubredditRepository subredditRepository;
 private final SubredditMapper subredditMapper;
 private final  AuthService authService;

 @Transactional
    public SubredditDto savesubreddit(SubredditDto subredditDto) {
     User currentUser=authService.getCurrentUser();

    Subreddit save=subredditRepository.save(subredditMapper.mapDtoToSubreddit(subredditDto,currentUser));
    subredditDto.setId(save.getId());
    return subredditDto;
    }

    private Subreddit mapSubredditDto(SubredditDto subredditDto) {
       return Subreddit.builder()
                .name(subredditDto.getName())
                .description(subredditDto.getDescription())
                .build();
    }


    @Transactional(readOnly = true)
    public List<SubredditDto> getallsubreddits() {

   return subredditRepository.findAll().stream().map(subredditMapper::mapSubredditToDto).collect(Collectors.toList());

    }


    private SubredditDto mapToDto(Subreddit subreddit) {
      return SubredditDto.builder()
              .id(subreddit.getId())
              .name(subreddit.getName())
      .description(subreddit.getDescription())
              .numberOfPosts(subreddit.getPosts().size())
              .build();
 }

    public SubredditDto getsubredditbyid(Long id) {
     Subreddit subreddit=subredditRepository.findById(id).orElseThrow(() -> new SpringRedditException("Subreddit not found with id "+id));
     return subredditMapper.mapSubredditToDto(subreddit);
    }
}
