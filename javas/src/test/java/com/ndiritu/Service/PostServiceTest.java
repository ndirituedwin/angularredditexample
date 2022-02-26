package com.ndiritu.Service;

import com.ndiritu.Dto.PostRequest;
import com.ndiritu.Dto.PostResponse;
import com.ndiritu.Entity.Post;
import com.ndiritu.Entity.Subreddit;
import com.ndiritu.Entity.User;
import com.ndiritu.Repository.PostRepository;
import com.ndiritu.Repository.SubredditRepository;
import com.ndiritu.Repository.UserRepository;
import com.ndiritu.mapper.PostMapper;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.Instant;
import java.util.Collections;
import java.util.Optional;

import static java.util.Collections.emptyList;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
@ExtendWith(MockitoExtension.class)
class PostServiceTest {
    @Mock
    private UserRepository  userRepository;
    @Mock
    private PostRepository postRepository;
    @Mock
    private SubredditRepository subredditRepository;
    @Mock
    private AuthService authService;
    @Mock
    private PostMapper postMapper;
    @Captor
    private ArgumentCaptor<Post> postArgumentCaptor;
    PostService postService;
    @BeforeEach
    public void setup(){
         postService=new PostService(userRepository,postRepository,subredditRepository,authService,postMapper);

    }
    @Test
    @DisplayName("should find post by id ")
    void getpostbyid() {
        Post post=new Post(123L,"FIRST POST","http://url/site. com","tes",0,null, Instant.now(),null);

      PostResponse expectedpostResponse=new
              PostResponse(123L,"FIRST POST","http://url/site. com","tes","username","subredd",0,0,"an hour ago",false,false);
          Mockito.when(postRepository.findById(123L)).thenReturn(java.util.Optional.of(post));
          Mockito.when(postMapper.mapPostToDto(Mockito.any(Post.class))).thenReturn(expectedpostResponse);
          PostResponse actualpostresponse=postService.getpostbyid(123L);
          System.out.println(actualpostresponse);
        assertThat(actualpostresponse.getId()).isEqualTo(expectedpostResponse.getId());
        assertThat(actualpostresponse.getName()).isEqualTo(expectedpostResponse.getName());

    }
    @Test
    @DisplayName("should save post")
    void shouldsavepost(){
        User currentUser=new User(123L,"userone","email","password",Instant.now(),true);
        Subreddit subreddit=new Subreddit(123L,"SUBONE","DESC", emptyList(),Instant.now(),null);
        Post post=new Post(123L,"first post","url","desc",0,null,Instant.now(),null);
        PostRequest postRequest=new PostRequest(null,"SUBONE","postone","url","description");
        Mockito.when(subredditRepository.findByName("SUBONE")).thenReturn(Optional.of(subreddit));
        Mockito.when(authService.getCurrentUser()).thenReturn(currentUser);
        Mockito.when(postMapper.mapDtoToPost(postRequest,subreddit,currentUser)).thenReturn(post);
        postService.savepost(postRequest);
        System.out.println("letss  "+postRequest);
        Mockito.verify(postRepository,Mockito.times(1)).save(postArgumentCaptor.capture());
        org.assertj.core.api.Assertions.assertThat(postArgumentCaptor.getValue().getId()).isEqualTo(123L);
        org.assertj.core.api.Assertions.assertThat(postArgumentCaptor.getValue().getName()).isEqualTo("first post");


    }
}