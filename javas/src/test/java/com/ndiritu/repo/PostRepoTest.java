package com.ndiritu.repo;

import com.ndiritu.BaseTest;
import com.ndiritu.Entity.Post;
import com.ndiritu.Repository.PostRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import java.time.Instant;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class PostRepoTest extends BaseTest {

    @Autowired
    private PostRepository postRepository;
    @Test
    public void shouldsavepost(){
        Post expectedpostobject=new Post(null,"name","url","descr",0,null, Instant.now(),null);
        Post actualpostobject=postRepository.save(expectedpostobject);
        Assertions.assertThat(actualpostobject).usingRecursiveComparison().ignoringFields("id")
                .isEqualTo(expectedpostobject);
    }
}
