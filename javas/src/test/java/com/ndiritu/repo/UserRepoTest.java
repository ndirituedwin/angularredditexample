package com.ndiritu.repo;

import com.ndiritu.Entity.User;
import com.ndiritu.Repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;

import java.time.Instant;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@ActiveProfiles("test")
public class UserRepoTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    public void shouldSaveUser(){
        User user=new User(null,"testuser_sql","test@email.com","password",Instant.now(),true);
        User saveuser=userRepository.save(user);
        System.out.println("woowwwwwwww"+saveuser);
        assertThat(saveuser).usingRecursiveComparison().ignoringFields("id").isEqualTo(user);
    }
//    @Test
//    @Sql("classpath:test-data.sql")
//    public  void shouldsaveuserthroughsqfile(){
//        Optional<User> test=userRepository.findByUsername("testuser_sql");
//        assertThat(test).isNotEmpty();
//    }
}
