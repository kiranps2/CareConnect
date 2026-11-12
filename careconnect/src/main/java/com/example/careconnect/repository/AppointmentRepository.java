package com.example.careconnect.repository;

import com.example.careconnect.entity.Appointment;
import com.example.careconnect.entity.AppointmentStatus;
import com.example.careconnect.entity.Doctor;
import com.example.careconnect.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalTime;
import java.util.Optional;

import java.time.LocalDate;
import java.util.List;

public interface AppointmentRepository
        extends JpaRepository<Appointment, Long> {

    List<Appointment> findByAppointmentDate(
            LocalDate appointmentDate);
    List<Appointment> findByPatientId(
            Long patientId); 
List<Appointment> findByPatientOrderByAppointmentDateAscAppointmentTimeAsc(
            User patient
    );

    Optional<Appointment> findByIdAndPatient(
            Long id,
            User patient
    );

    boolean existsByDoctorAndAppointmentDateAndAppointmentTimeAndStatus(
            Doctor doctor,
            LocalDate appointmentDate,
            LocalTime appointmentTime,
            AppointmentStatus status
    );       
}
