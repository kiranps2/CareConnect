package com.example.careconnect.repository;

import com.example.careconnect.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DoctorRepository
        extends JpaRepository<Doctor, Long> {
}
