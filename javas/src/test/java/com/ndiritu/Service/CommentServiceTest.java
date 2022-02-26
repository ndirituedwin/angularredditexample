package com.ndiritu.Service;

import com.ndiritu.Exceptions.SpringRedditException;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.*;

public class CommentServiceTest {
    CommentService commentService=new CommentService(null,null,null,null,null,null,null);

    @Test
    @DisplayName("test should pass if there is no swear words")
    void shoudnotcontainswearwordsincomment() {
  commentService.containsswearwords("this is a clean text");
//        Assertions.assertFalse(commentService.containsswearwords("this is a clean text"));
     assertThat(commentService.containsswearwords("this is a clean text")).isFalse();
    }
    @Test
    @DisplayName("should throw an exception when exception contains swear words")
    void shouldfailwhentextcontainsswearwords(){
//        SpringRedditException exception=assertThrows(SpringRedditException.class,()->{
//            commentService.containsswearwords("this is a shity comment");
//        });
//        assertTrue(exception.getMessage().contains("comments contain unacceptable language"));

    assertThatThrownBy(() -> {
        commentService.containsswearwords("this.is a shitty comment ");
    }).isInstanceOf(SpringRedditException.class).hasMessage("comments contain unacceptable language");
    }
}