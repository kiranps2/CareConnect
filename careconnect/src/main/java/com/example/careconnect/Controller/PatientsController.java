package com.example.careconnect.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PatientsController {

    @GetMapping("/patients")
    public String patients() {
        return "patients";
    }
}