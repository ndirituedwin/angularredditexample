package com.ndiritu.Repository;

import com.ndiritu.Dto.CommentDto;
import com.ndiritu.Entity.Comment;
import com.ndiritu.Entity.Post;
import com.ndiritu.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CommentRepository extends JpaRepository<Comment,Long> {
    List<Comment> findByPost(Post post);

    List<Comment> findAllByUser(User user);
}
