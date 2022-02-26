package com.ndiritu.Service;

import com.ndiritu.Dto.CommentDto;
import com.ndiritu.Entity.Comment;
import com.ndiritu.Entity.NotificationEmail;
import com.ndiritu.Entity.Post;
import com.ndiritu.Entity.User;
import com.ndiritu.Exceptions.PostNotFountException;
import com.ndiritu.Exceptions.SpringRedditException;
import com.ndiritu.Repository.CommentRepository;
import com.ndiritu.Repository.PostRepository;
import com.ndiritu.Repository.UserRepository;
import com.ndiritu.mapper.CommentMapper;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@AllArgsConstructor
public class CommentService {
    private static final String POST_URL="";
    private final CommentRepository commentRepository;
    private final AuthService authService;
    private final PostRepository postRepository;
    private final CommentMapper commentMapper;
    private final MailContentBuilder mailContentBuilder;
    private final MailService mailService;
   private final UserRepository userRepository;
    public void savecomment(CommentDto commentDto) {
        Post post=postRepository.findById(commentDto.getPostId()).orElseThrow(() -> new PostNotFountException("post with id "+commentDto.getPostId()+ " not found"));
        Comment comment=commentMapper.map(commentDto,post,authService.getCurrentUser());
        commentRepository.save(comment);
        String message=mailContentBuilder.build(post.getUser().getUsername()+" posted a comment on your post "+POST_URL);
        sendCommentNotification(message,post.getUser());
    }

    private void sendCommentNotification(String message, User user) {
        mailService.sendmail(new NotificationEmail(user.getUsername()+ " Commented on your post",user.getEmail(),message));

    }

    public List<CommentDto> getallcommentsforapost(Long postId) {
   Post post=postRepository.findById(postId).orElseThrow(() -> new PostNotFountException("post with id "+postId+" not found"));
   return commentRepository.findByPost(post).stream().map(commentMapper::mapToDto).collect(Collectors.toList());

    }

    public List<CommentDto> getallcommentsforuser(String username) {
        User user=userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("user with username "+username+" not found"));
        return commentRepository.findAllByUser(user).stream().map(commentMapper::mapToDto).collect(Collectors.toList());
    }

    public boolean containsswearwords(String comment){
        if (comment.contains("shit")){
            throw new SpringRedditException("comments contain unacceptable language");
        }
        return false;
    }
}
