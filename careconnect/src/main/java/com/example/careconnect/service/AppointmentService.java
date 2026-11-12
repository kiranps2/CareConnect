package com.example.careconnect.service;

import com.example.careconnect.dto.AppointmentRequest;
import com.example.careconnect.dto.AppointmentResponse;
import com.example.careconnect.entity.Appointment;
import com.example.careconnect.entity.AppointmentStatus;
import com.example.careconnect.entity.Doctor;
import com.example.careconnect.entity.User;
import com.example.careconnect.repository.AppointmentRepository;
import com.example.careconnect.repository.DoctorRepository;
import java.time.LocalDate;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class AppointmentService {

     private final AppointmentRepository
            appointmentRepository;

    private final DoctorRepository
            doctorRepository;

    public AppointmentService(
            AppointmentRepository appointmentRepository,
            DoctorRepository doctorRepository) {

        this.appointmentRepository =
                appointmentRepository;

        this.doctorRepository =
                doctorRepository;
    }

    public List<AppointmentResponse>
            getPatientAppointments(User patient) {

        return appointmentRepository
                .findByPatientOrderByAppointmentDateAscAppointmentTimeAsc(
                    patient
                )
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional
    public AppointmentResponse createAppointment(
            AppointmentRequest request,
            User patient) {

        Doctor doctor =
                doctorRepository
                    .findByIdAndIsActiveTrue(
                        request.getDoctorId()
                    )
                    .orElseThrow(() ->
                        new IllegalArgumentException(
                            "Doctor not found."
                        )
                    );

        boolean alreadyBooked =
                appointmentRepository
                    .existsByDoctorAndAppointmentDateAndAppointmentTimeAndStatus(
                        doctor,
                        request.getAppointmentDate(),
                        request.getAppointmentTime(),
                        AppointmentStatus.BOOKED
                    );

        if (alreadyBooked) {

            throw new IllegalArgumentException(
                "The selected time slot is not available."
            );
        }

        Appointment appointment =
                new Appointment();

        appointment.setPatient(patient);

        appointment.setDoctor(doctor);

        appointment.setAppointmentDate(
            request.getAppointmentDate()
        );

        appointment.setAppointmentTime(
            request.getAppointmentTime()
        );

        appointment.setStatus(AppointmentStatus.BOOKED);

        Appointment saved =
                appointmentRepository.save(
                    appointment
                );

        return toResponse(saved);
    }

    @Transactional
    public void cancelAppointment(
            Long id,
            User patient) {

        Appointment appointment =
                appointmentRepository
                    .findByIdAndPatient(
                        id,
                        patient
                    )
                    .orElseThrow(() ->
                        new IllegalArgumentException(
                            "Appointment not found."
                        )
                    );

        if (!"Booked".equalsIgnoreCase(appointment.getStatus().name())) {

            throw new IllegalArgumentException(
                "This appointment cannot be cancelled."
            );
        }

        appointment.setStatus(AppointmentStatus.CANCELLED);

        appointmentRepository.save(
            appointment
        );
    }

    private AppointmentResponse toResponse(
            Appointment appointment) {

        return new AppointmentResponse(
            appointment.getId(),
            appointment.getDoctor().getId(),
            appointment.getDoctor().getName(),
            appointment.getAppointmentDate(),
            appointment.getAppointmentTime(),
            appointment.getStatus() != null ? appointment.getStatus().name() : null
        );
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