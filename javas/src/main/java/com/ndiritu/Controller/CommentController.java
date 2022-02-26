package com.ndiritu.Controller;

import com.ndiritu.Dto.CommentDto;
import com.ndiritu.Service.CommentService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import java.util.List;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/api/comments")
@AllArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @PostMapping("/save")
    public ResponseEntity<Void> createcomment(@Valid @RequestBody CommentDto commentDto){
        commentService.savecomment(commentDto);
        return new ResponseEntity<>(CREATED);
    }
    @GetMapping("/commentsforpost/{postId}")
    public ResponseEntity<List<CommentDto>> getallcommentsforapost(@PathVariable("postId") Long postId){
        return ResponseEntity.status(OK).body(commentService.getallcommentsforapost(postId));
    }
    @GetMapping("/commentsforuser/{username}")
    public ResponseEntity<List<CommentDto>> getallcommentsforuser(@PathVariable("username") String  username){
        return ResponseEntity.status(OK).body(commentService.getallcommentsforuser(username));
    }

}
