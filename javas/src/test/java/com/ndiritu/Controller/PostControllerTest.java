package com.ndiritu.Controller;

import com.ndiritu.Dto.PostResponse;
import com.ndiritu.Service.PostService;
import com.ndiritu.security.JwtProvider;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.*;

@WebMvcTest(PostController.class)
class PostControllerTest {

    @MockBean
    private PostService postService;
    @Autowired
    private MockMvc mockMvc;
    @MockBean
    private UserDetailsService userDetailsService;
    @MockBean
    private JwtProvider jwtProvider;

    @Test
    @DisplayName("should list all posts in url")
    void getallposts() throws Exception {
        PostResponse postResponse=new PostResponse(1L,"name1","url1","desc","username",null,0,0,"i day ago"
        ,false,false);
        PostResponse postResponse1=new PostResponse(2L,"name3","url1","desc","username",null,0,0,"i day ago"
                ,false,false);
        Mockito.when(postService.getallposts()).thenReturn(Arrays.asList(postResponse,postResponse1));

        mockMvc.perform(MockMvcRequestBuilders.get("/api/posts"))
                .andExpect(MockMvcResultMatchers.status().is(200)).andExpect(
                        MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON)
        ).andExpect(MockMvcResultMatchers.jsonPath("$.size()", Matchers.is(2)));
    }
}