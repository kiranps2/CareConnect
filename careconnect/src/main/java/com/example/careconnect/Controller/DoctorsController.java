package com.example.careconnect.Controller;

import com.example.careconnect.entity.Doctor;
import com.example.careconnect.service.DoctorService;

import jakarta.validation.Valid;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/doctor")
public class DoctorsController {

    private final DoctorService doctorService;

    public DoctorsController(DoctorService doctorService) {
        this.doctorService = doctorService;
    }

    @GetMapping
    public String listDoctors(Model model) {

        model.addAttribute(
                "doctors",
                doctorService.getAllDoctors()
        );

        return "doctor";
    }

    @GetMapping("/add")
    public String addDoctorForm(Model model) {

        model.addAttribute(
                "doctor",
                new Doctor()
        );

        return "form";
    }

    @PostMapping("/add")
    public String addDoctor(
            @Valid @ModelAttribute("doctor") Doctor doctor,
            BindingResult result) {

        if (result.hasErrors()) {

            return "form";
        }

        doctorService.saveDoctor(doctor);

        return "redirect:/doctor";
    }
        @GetMapping("/edit/{id}")
    public String editDoctorForm(
            @PathVariable Long id,
            Model model) {

        Doctor doctor = doctorService
                .getDoctorById(id)
                .orElseThrow();

        model.addAttribute(
            "doctor",
            doctor
        );

        return "form";
    }
        @PostMapping("/edit/{id}")
    public String editDoctor(
            @PathVariable Long id,
            @Valid @ModelAttribute("doctor") Doctor doctor,
            BindingResult result) {

        if (result.hasErrors()) {

            return "form";
        }

        Doctor existingDoctor = doctorService
                .getDoctorById(id)
                .orElseThrow();

        existingDoctor.setName(doctor.getName());
        existingDoctor.setSpecialization(
            doctor.getSpecialization()
        );
        existingDoctor.setQualification(
            doctor.getQualification()
        );
        existingDoctor.setExperience(
            doctor.getExperience()
        );
        existingDoctor.setPhoneNumber(
            doctor.getPhoneNumber()
        );
        existingDoctor.setEmail(
            doctor.getEmail()
        );
        existingDoctor.setConsultationFee(
            doctor.getConsultationFee()
        );
        existingDoctor.setIsActive(
            doctor.getIsActive()
        );

        doctorService.saveDoctor(existingDoctor);

        return "redirect:/doctor";
    }
    @GetMapping("/delete/{id}")
public String deleteDoctor(
        @PathVariable Long id) {

    doctorService.deleteDoctor(id);

    return "redirect:/doctor";
}
}