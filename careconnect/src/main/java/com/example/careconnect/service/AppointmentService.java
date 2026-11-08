package com.example.careconnect.service;

import com.example.careconnect.entity.Appointment;
import com.example.careconnect.repository.AppointmentRepository;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class AppointmentService {

    private final AppointmentRepository
            appointmentRepository;

    public AppointmentService(
            AppointmentRepository appointmentRepository) {

        this.appointmentRepository =
                appointmentRepository;
    }

    public List<Appointment> getAllAppointments() {

        return appointmentRepository.findAll();
    }

    public List<Appointment> getAppointmentsByDate(
            LocalDate date) {

        return appointmentRepository
                .findByAppointmentDate(date);
    }

    public Appointment getAppointmentById(Long id) {

        return appointmentRepository
                .findById(id)
                .orElseThrow();
    }
    public List<Appointment> getAppointmentsByPatient(
        Long patientId) {

    return appointmentRepository
            .findByPatientId(patientId);
}
}
