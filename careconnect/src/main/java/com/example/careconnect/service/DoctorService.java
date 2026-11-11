package com.example.careconnect.service;
import com.example.careconnect.entity.Doctor;
import com.example.careconnect.repository.DoctorRepository;

import org.springframework.stereotype.Service;
import com.example.careconnect.dto.DoctorReport;
import java.util.List;
import java.util.Optional;
@Service
public class DoctorService {

    private final DoctorRepository doctorRepository;

    public DoctorService(
            DoctorRepository doctorRepository) {

        this.doctorRepository = doctorRepository;
    }

    public List<Doctor> getAllDoctors() {

        return doctorRepository.findAll();
    }

    public Optional<Doctor> getDoctorById(Long id) {

        return doctorRepository.findById(id);
    }

    public Doctor saveDoctor(Doctor doctor) {

        return doctorRepository.save(doctor);
    }

    public void deleteDoctor(Long id) {

        doctorRepository.deleteById(id);
    }
    public List<DoctorReport> getPopularDoctors() {

        return doctorRepository
            .getPopularDoctors();
    }
    public List<Doctor> getActiveDoctors() {

    return doctorRepository
            .findByIsActiveTrue();
    }
    public Optional<Doctor> getActiveDoctorById(
            Long id) {

        return doctorRepository
                .findByIdAndIsActiveTrue(id);
    }
}
