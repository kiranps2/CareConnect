package com.example.careconnect.Controller;

import com.example.careconnect.entity.User;
import com.example.careconnect.service.AppointmentService;
import com.example.careconnect.service.UserService;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/patients")
public class UserController {

    private final UserService userService;
    private final AppointmentService appointmentService;

    public UserController(
            UserService userService,
            AppointmentService appointmentService) {

        this.userService = userService;
        this.appointmentService = appointmentService;
    }

    @GetMapping
    public String listUsers(
            @RequestParam(required = false) String search,
            Model model) {

        model.addAttribute("users", userService.searchPatients(search));
        // Echo the search term back so the input stays filled
        model.addAttribute("search", search != null ? search : "");
        return "patients";
    }

    @GetMapping("/{id}")
    public String viewUser(
            @PathVariable Long id,
            Model model) {

        User user = userService.getUserById(id);
        model.addAttribute("user", user);
        model.addAttribute(
            "appointments",
            appointmentService.getAppointmentsByPatient(id)
        );
        return "userview";
    }
}