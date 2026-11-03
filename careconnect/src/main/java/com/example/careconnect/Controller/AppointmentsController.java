package com.example.careconnect.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AppointmentsController {

    @GetMapping("/appointments")
    public String Appointments() {

        return "appointments";
    }
}