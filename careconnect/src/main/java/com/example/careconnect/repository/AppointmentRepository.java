
package com.example.careconnect.repository;

import com.example.careconnect.entity.Appointment;
import com.example.careconnect.entity.AppointmentStatus;
import com.example.careconnect.entity.Doctor;
import com.example.careconnect.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

public interface AppointmentRepository
        extends JpaRepository<Appointment, Long> {

                
    // =========================================
    // APPOINTMENT RETRIEVAL
    // =========================================

    // Get appointments by date
    List<Appointment> findByAppointmentDate(LocalDate appointmentDate);
    // Get all appointments ordered by date and time
List<Appointment> findTop4ByOrderByAppointmentDateAscAppointmentTimeAsc();    // Get appointments by date, sorted by time
    List<Appointment> findByAppointmentDateOrderByAppointmentTimeAsc(
            LocalDate appointmentDate
    );

    // Get appointments by patient
    List<Appointment> findByPatientId(Long patientId);

    List<Appointment> findByPatientOrderByAppointmentDateAscAppointmentTimeAsc(
            User patient
    );

    Optional<Appointment> findByIdAndPatient(
            Long id,
            User patient
    );


    // =========================================
    // APPOINTMENT VALIDATION
    // =========================================

    boolean existsByDoctorAndAppointmentDateAndAppointmentTimeAndStatus(
            Doctor doctor,
            LocalDate appointmentDate,
            LocalTime appointmentTime,
            AppointmentStatus status
    );


    // =========================================
    // DASHBOARD STATISTICS
    // =========================================

    long countByStatus(AppointmentStatus status);

    long countByAppointmentDate(LocalDate date);


    // =========================================
    // MONTHLY APPOINTMENT STATISTICS
    // =========================================

    @Query("""
        SELECT MONTH(a.appointmentDate), COUNT(a)
        FROM Appointment a
        WHERE YEAR(a.appointmentDate) = :year
        GROUP BY MONTH(a.appointmentDate)
        ORDER BY MONTH(a.appointmentDate)
    """)
    List<Object[]> countByMonthForYear(
            @Param("year") int year
    );

}
