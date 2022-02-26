package com.ndiritu.Controller;

import com.ndiritu.Dto.PostRequest;
import com.ndiritu.Dto.PostResponse;
import com.ndiritu.Service.PostService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

import static org.springframework.http.ResponseEntity.status;

@AllArgsConstructor
@RestController
@RequestMapping("/api/posts")
public class PostController {

    private final PostService postService;

    @PostMapping
    public ResponseEntity createpost(@Valid @RequestBody PostRequest postRequest){
        postService.savepost(postRequest);
        return new ResponseEntity(HttpStatus.CREATED);
    }
    @GetMapping("/{id}")
    public ResponseEntity<PostResponse>  getpost(@PathVariable("id") Long id){
        return status(HttpStatus.OK).body(postService.getpostbyid(id));
    }
    @GetMapping
    public List<PostResponse> getallposts(){
        return postService.getallposts();
    }
    @GetMapping("by-subreddit/{id}")
    public ResponseEntity<List<PostResponse>>  getposstbysubreddit(@PathVariable Long id){
        return status(HttpStatus.OK).body(postService.getposstbysubreddit(id));
    }
    @GetMapping("by-username/{username}")
    public ResponseEntity<List<PostResponse>> getallpostsbyusername(@PathVariable("username") String username){
        return  status(HttpStatus.OK).body( postService.getallpostsbyusername(username));
    }

}


