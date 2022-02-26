package com.ndiritu.Service;

import com.ndiritu.Dto.PostRequest;
import com.ndiritu.Dto.PostResponse;
import com.ndiritu.Entity.Post;
import com.ndiritu.Entity.Subreddit;
import com.ndiritu.Entity.User;
import com.ndiritu.Exceptions.PostNotFountException;
import com.ndiritu.Exceptions.SubredditNotFoundException;
import com.ndiritu.Repository.PostRepository;
import com.ndiritu.Repository.SubredditRepository;
import com.ndiritu.Repository.UserRepository;
import com.ndiritu.mapper.PostMapper;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Slf4j
@Transactional
public class PostService {

    private final UserRepository userRepository;
    private final PostRepository postRepository;
    private final SubredditRepository subredditRepository;
    private final AuthService authService;
    private final PostMapper postMapper;
    public Post savepost(PostRequest postRequest) {
        Subreddit subreddit=subredditRepository.findByName(postRequest.getSubredditName()).orElseThrow(() -> new SubredditNotFoundException("subreddit with name "+postRequest.getSubredditName()+" not found"));
        log.info("logging the subreddit {}",subreddit);
        User currentUser=authService.getCurrentUser();
        log.info("logiing the currently logged in user {}",currentUser);
        return postRepository.save(postMapper.mapDtoToPost(postRequest,subreddit,currentUser));


    }

    @Transactional(readOnly = true)
    public List<PostResponse> getallposts() {

         return postRepository.findAll().stream().map(postMapper::mapPostToDto).collect(Collectors.toList());

    }

    @Transactional(readOnly = true)
    public PostResponse getpostbyid(Long id) {
           Post post=postRepository.findById(id).orElseThrow(() -> new PostNotFountException("post with id "+id+" not found"));
      return postMapper.mapPostToDto(post);
    }

    @Transactional(readOnly = true)
    public List<PostResponse> getposstbysubreddit(Long id) {
    Subreddit subreddit=subredditRepository.findById(id).orElseThrow(() -> new SubredditNotFoundException("subreddit with id "+id +" not found"));
    List<Post> posts=postRepository.findAllBySubreddit(subreddit);
    return posts.stream()
            .map(postMapper::mapPostToDto).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<PostResponse> getallpostsbyusername(String username) {
        User user=userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("username "+username +" not found"));
        return postRepository.findByUser(user).stream().map(postMapper::mapPostToDto).collect(Collectors.toList());
    }
}
