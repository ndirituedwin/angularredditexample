package com.ndiritu.Repository;

import com.ndiritu.Dto.PostResponse;
import com.ndiritu.Entity.Post;
import com.ndiritu.Entity.Subreddit;
import com.ndiritu.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post,Long> {
    List<Post> findAllBySubreddit(Subreddit subreddit);

    List<Post> findByUser(User user);
}
