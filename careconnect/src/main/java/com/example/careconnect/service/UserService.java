package com.example.careconnect.service;

import com.example.careconnect.entity.Role;
import com.example.careconnect.entity.User;
import com.example.careconnect.repository.UserRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(
            UserRepository userRepository) {

        this.userRepository = userRepository;
    }

    public List<User> getAllPatients() {

        return userRepository.findByRole(
            Role.PATIENT
        );
    }

    public User getUserById(Long id) {

        return userRepository
                .findById(id)
                .orElseThrow();
    }
}
