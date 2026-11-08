package com.example.careconnect.dto;

import com.example.careconnect.entity.Doctor;

public class DoctorReport {

    private Doctor doctor;

    private Long totalBookings;

    public DoctorReport(
            Doctor doctor,
            Long totalBookings) {

        this.doctor = doctor;
        this.totalBookings = totalBookings;
    }

    public Doctor getDoctor() {

        return doctor;
    }

    public Long getTotalBookings() {

        return totalBookings;
    }
}
