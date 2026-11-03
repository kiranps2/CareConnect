package com.example.careconnect.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ReportsController {

    @GetMapping("/reports")
    public String report() {
        return "reports";
    }
}