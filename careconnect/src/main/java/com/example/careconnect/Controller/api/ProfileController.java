package com.example.careconnect.Controller.api;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.careconnect.dto.ChangePasswordRequest;
import com.example.careconnect.entity.User;
import com.example.careconnect.service.UserService;
@RestController
@RequestMapping("/api")
public class ProfileController {

    private final UserService userService;

    public ProfileController(UserService userService) {
        this.userService = userService;
    }

    @PutMapping("/change-password")
    public ResponseEntity<?> changePassword(
            @RequestBody ChangePasswordRequest request,
            Authentication authentication) {

        User user =
                (User) authentication.getPrincipal();

        userService.changePassword(
                user,
                request.getCurrentPassword(),
                request.getNewPassword()
        );

        return ResponseEntity.ok(
                Map.of(
                    "message",
                    "Password updated successfully."
                )
        );
    }
}
