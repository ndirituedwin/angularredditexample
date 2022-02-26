package com.ndiritu.Controller;

import com.ndiritu.Dto.SubredditDto;
import com.ndiritu.Service.SubredditService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/subreddit")
@AllArgsConstructor
public class SubredditController {
 private final SubredditService subredditService;

    @PostMapping("/save")
    public ResponseEntity<?> savesubreddit(@Valid @RequestBody SubredditDto subredditDto){
//        return subredditService.savesubreddit(subredditDto);
        return  ResponseEntity.status(HttpStatus.CREATED).body(subredditService.savesubreddit(subredditDto));
    }
    @GetMapping("/getall")
    public ResponseEntity<List<SubredditDto>> getallsubreddits(){
        return ResponseEntity.status(HttpStatus.OK).body(subredditService.getallsubreddits());
    }
    @GetMapping("/{id}")
    public ResponseEntity<SubredditDto> getsubredditbyid(@PathVariable("id") Long id){
        return ResponseEntity.status(HttpStatus.OK).body(subredditService.getsubredditbyid(id));
    }
}
