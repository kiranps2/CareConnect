package com.example.careconnect.repository;

import com.example.careconnect.entity.Role;
import com.example.careconnect.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository
        extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    List<User> findByRole(Role role);

    @Query("""
        SELECT u FROM User u
        WHERE u.role = :role
          AND (
               LOWER(u.firstName)   LIKE LOWER(CONCAT('%', :search, '%'))
            OR LOWER(u.lastName)    LIKE LOWER(CONCAT('%', :search, '%'))
            OR LOWER(u.email)       LIKE LOWER(CONCAT('%', :search, '%'))
            OR LOWER(u.phoneNumber) LIKE LOWER(CONCAT('%', :search, '%'))
          )
    """)
    List<User> searchByRoleAndTerm(
            @Param("role")   Role role,
            @Param("search") String search
    );
}
