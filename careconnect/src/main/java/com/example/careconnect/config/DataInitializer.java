package com.example.careconnect.config;

import com.example.careconnect.entity.Role;
import com.example.careconnect.entity.User;
import com.example.careconnect.repository.UserRepository;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner createAdministrator(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {

        return args -> {

            if (userRepository
                    .findByEmail("admin@careconnect.com")
                    .isEmpty()) {

                User user = new User();

                user.setName("Administrator");

                user.setEmail(
                    "admin@careconnect.com"
                );

                user.setPassword(
                    passwordEncoder.encode("admin123")
                );

                user.setRole(Role.ADMIN);

                userRepository.save(user);
            }
        };
    }
}
