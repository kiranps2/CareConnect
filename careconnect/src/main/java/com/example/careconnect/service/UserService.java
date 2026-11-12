package com.example.careconnect.service;

import com.example.careconnect.entity.Role;
import com.example.careconnect.entity.User;
import com.example.careconnect.repository.UserRepository;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;
    
    private final PasswordEncoder passwordEncoder;

    public UserService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<User> getAllPatients() {
        return userRepository.findByRole(Role.PATIENT);
    }

    /**
     * Returns patients matching the search term (name / email / phone).
     * Falls back to all patients when the term is blank.
     */
    public List<User> searchPatients(String search) {
        if (search == null || search.isBlank()) {
            return getAllPatients();
        }
        return userRepository.searchByRoleAndTerm(Role.PATIENT, search.trim());
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElseThrow();
    }
    public void changePassword(
        User user,
        String currentPassword,
        String newPassword) {

    if (!passwordEncoder.matches(
            currentPassword,
            user.getPassword())) {

        throw new RuntimeException(
                "Current password is incorrect."
        );
    }

    user.setPassword(
            passwordEncoder.encode(newPassword)
    );

    userRepository.save(user);
}
}
