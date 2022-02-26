package com.ndiritu.repo;

import com.ndiritu.BaseTest;
import com.ndiritu.Entity.User;
import com.ndiritu.Repository.UserRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;

import java.time.Instant;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class UserRepositoryTest extends BaseTest {

    @Autowired
    private UserRepository userRepository;
    @Test
    public void shouldsaveuser(){
        User expecteduser=new User(123L,"test user","email@email.com","password", Instant.now(),false);
        User actualuserobject=userRepository.save(expecteduser);
        Assertions.assertThat(actualuserobject).usingRecursiveComparison().ignoringFields("id")
                .isEqualTo(expecteduser);
    }
}
