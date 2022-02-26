package com.ndiritu;

import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;

public class BaseTest {

   static PostgreSQLContainer postgreSQLContainer=(PostgreSQLContainer) new PostgreSQLContainer("postgres:latest")
            .withDatabaseName("spring-reddit-testdb")
            .withPassword("pass")
            .withUsername("testUser");
   static {
       postgreSQLContainer.start();
   }
}
