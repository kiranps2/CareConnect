package com.example.careconnect.repository;

import com.example.careconnect.dto.DoctorReport;
import com.example.careconnect.entity.Doctor;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DoctorRepository
        extends JpaRepository<Doctor, Long> {
                 @Query("""
        SELECT new com.example.careconnect.dto.DoctorReport(
            d,
            COUNT(DISTINCT a.patient)
        )
        FROM Doctor d
        LEFT JOIN Appointment a
            ON a.doctor.id = d.id
        GROUP BY d
        ORDER BY COUNT(DISTINCT a.patient) DESC
    """)
    List<DoctorReport> getPopularDoctors();
}
