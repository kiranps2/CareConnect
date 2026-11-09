package com.example.careconnect.repository;

import com.example.careconnect.entity.AuthToken;
import com.example.careconnect.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AuthTokenRepository
        extends JpaRepository<AuthToken, Long> {

    Optional<AuthToken> findByToken(String token);

    Optional<AuthToken> findByUser(User user);

    void deleteByToken(String token);
}
