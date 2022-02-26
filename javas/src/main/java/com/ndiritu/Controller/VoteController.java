package com.ndiritu.Controller;

import com.ndiritu.Dto.VoteDto;
import com.ndiritu.Service.VoteService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/votes")
@AllArgsConstructor
public class VoteController {

private final VoteService voteService;

@PostMapping("/save")
public ResponseEntity<Void> vote(@Valid @RequestBody VoteDto voteDto){
    voteService.vote(voteDto);
    return new ResponseEntity<>(HttpStatus.OK);
}
}
