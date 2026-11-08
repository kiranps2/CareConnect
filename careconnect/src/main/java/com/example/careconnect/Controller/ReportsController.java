package com.example.careconnect.Controller;


import com.example.careconnect.service.DoctorService;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
@RequestMapping("/reports")
public class ReportsController {

    private final DoctorService doctorService;

    public ReportsController(
            DoctorService doctorService) {

        this.doctorService = doctorService;
    }

    @GetMapping
    public String popularDoctors(Model model) {

        model.addAttribute(
            "doctors",
            doctorService.getPopularDoctors()
        );

        return "reports";
    }
}