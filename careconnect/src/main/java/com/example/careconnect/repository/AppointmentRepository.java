package com.example.careconnect.repository;

import com.example.careconnect.entity.Appointment;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface AppointmentRepository
        extends JpaRepository<Appointment, Long> {

    List<Appointment> findByAppointmentDate(
            LocalDate appointmentDate);
    List<Appointment> findByPatientId(
            Long patientId);        
}
