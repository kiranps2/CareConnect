
package com.example.careconnect.Controller;

import com.example.careconnect.entity.Appointment;
import com.example.careconnect.entity.AppointmentStatus;
import com.example.careconnect.entity.Role;
import com.example.careconnect.repository.AppointmentRepository;
import com.example.careconnect.repository.DoctorRepository;
import com.example.careconnect.repository.UserRepository;
import com.example.careconnect.service.DoctorService;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.time.Year;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Controller
public class HomeController {

    private static final String[] MONTH_NAMES = {
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    };

    private final AppointmentRepository appointmentRepository;
    private final DoctorRepository doctorRepository;
    private final UserRepository userRepository;
    private final DoctorService doctorService;

    public HomeController(
            AppointmentRepository appointmentRepository,
            DoctorRepository doctorRepository,
            UserRepository userRepository,
            DoctorService doctorService) {

        this.appointmentRepository = appointmentRepository;
        this.doctorRepository = doctorRepository;
        this.userRepository = userRepository;
        this.doctorService = doctorService;
    }

    @GetMapping("/")
    public String home(Model model) {

        // Dashboard statistics
        long totalAppointments = appointmentRepository.count();

        long todayAppointments =
                appointmentRepository.countByAppointmentDate(LocalDate.now());

        long totalDoctors = doctorRepository.count();

        long activeDoctors =
                doctorRepository.findByIsActiveTrue().size();

        long totalPatients =
                userRepository.findByRole(Role.PATIENT).size();

        // Appointment status counts
        long bookedCount =
                appointmentRepository.countByStatus(AppointmentStatus.BOOKED);

        long completedCount =
                appointmentRepository.countByStatus(AppointmentStatus.COMPLETED);

        long confirmedCount = bookedCount + completedCount;

        // No PENDING status currently exists in your enum
        long pendingCount = 0L;

        long cancelledCount =
                appointmentRepository.countByStatus(AppointmentStatus.CANCELLED);

        long pendingAppointments = bookedCount;

        // Monthly chart data
        int currentYear = Year.now().getValue();

        List<Object[]> monthlyRaw =
                appointmentRepository.countByMonthForYear(currentYear);

        long[] monthlyCounts = new long[12];

        for (Object[] row : monthlyRaw) {

            int monthNum = ((Number) row[0]).intValue();
            long count = ((Number) row[1]).longValue();

            if (monthNum >= 1 && monthNum <= 12) {
                monthlyCounts[monthNum - 1] = count;
            }
        }

        List<String> monthlyLabels = new ArrayList<>();
        List<Long> monthlyAppointmentCounts = new ArrayList<>();

        for (int i = 0; i < 12; i++) {
            monthlyLabels.add(MONTH_NAMES[i]);
            monthlyAppointmentCounts.add(monthlyCounts[i]);
        }

        // Get ALL appointments, not only today's appointments
        List<Appointment> appointments =
        appointmentRepository
                .findTop4ByOrderByAppointmentDateAscAppointmentTimeAsc();
        // Top doctors
        var topDoctors = doctorService.getPopularDoctors();

        // Recent patients
        var recentPatients =
                userRepository.findTop5ByRoleOrderByCreatedAtDesc(Role.PATIENT);

        // Send data to Thymeleaf
        model.addAttribute("totalAppointments", totalAppointments);
        model.addAttribute("todayAppointments", todayAppointments);
        model.addAttribute("totalDoctors", totalDoctors);
        model.addAttribute("activeDoctors", activeDoctors);
        model.addAttribute("totalPatients", totalPatients);

        model.addAttribute("pendingAppointments", pendingAppointments);

        model.addAttribute("confirmedCount", confirmedCount);
        model.addAttribute("pendingCount", pendingCount);
        model.addAttribute("cancelledCount", cancelledCount);

        model.addAttribute("monthlyLabels", monthlyLabels);
        model.addAttribute("monthlyAppointmentCounts", monthlyAppointmentCounts);

        model.addAttribute("appointments", appointments);
        model.addAttribute("topDoctors", topDoctors);
        model.addAttribute("recentPatients", recentPatients);

        return "home";
    }
}
