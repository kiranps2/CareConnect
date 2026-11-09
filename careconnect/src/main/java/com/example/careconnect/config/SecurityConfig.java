package com.example.careconnect.config;

import com.example.careconnect.repository.AuthTokenRepository;
import com.example.careconnect.security.TokenAuthenticationFilter;
import com.example.careconnect.service.UserDetailsServiceImpl;

import jakarta.servlet.DispatcherType;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    private final AuthTokenRepository authTokenRepository;
    private final UserDetailsServiceImpl userDetailsService;
    private final PasswordEncoder passwordEncoder;

    public SecurityConfig(
            AuthTokenRepository authTokenRepository,
            UserDetailsServiceImpl userDetailsService,
            PasswordEncoder passwordEncoder) {

        this.authTokenRepository = authTokenRepository;
        this.userDetailsService = userDetailsService;
        this.passwordEncoder = passwordEncoder;
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        // Spring Security 7: constructor requires UserDetailsService directly
        DaoAuthenticationProvider provider =
                new DaoAuthenticationProvider(userDetailsService);
        provider.setPasswordEncoder(passwordEncoder);
        return provider;
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        TokenAuthenticationFilter tokenAuthenticationFilter =
                new TokenAuthenticationFilter(authTokenRepository);

        http
            // Disable CSRF (REST API + form login both work without CSRF here)
            .csrf(csrf -> csrf.disable())

            .authenticationProvider(authenticationProvider())

            .authorizeHttpRequests(auth -> auth

                // Always allow Spring's error dispatcher
                .dispatcherTypeMatchers(DispatcherType.ERROR).permitAll()

                // Public pages
                .requestMatchers(
                    "/login",
                    "/css/**",
                    "/js/**",
                    "/images/**"
                ).permitAll()

                // Public REST API endpoints
                .requestMatchers(
                    "/api/register",
                    "/api/login",
                    "/api/doctors",
                    "/api/doctors/**"
                ).permitAll()

                // All other /api/** endpoints require authentication
                .requestMatchers("/api/**").authenticated()

                // All other pages (admin portal) require ADMIN role
                .anyRequest().hasRole("ADMIN")
            )

            // Wire Spring Security form login to handle POST /login
            .formLogin(form -> form
                .loginPage("/login")
                .loginProcessingUrl("/login")
                .defaultSuccessUrl("/", true)
                .failureUrl("/login?error=true")
                .usernameParameter("username")
                .passwordParameter("password")
                .permitAll()
            )

            // Logout configuration
            .logout(logout -> logout
                .logoutUrl("/logout")
                .logoutSuccessUrl("/login?logout=true")
                .permitAll()
            )

            // Token-based filter for REST API calls
            .addFilterBefore(
                tokenAuthenticationFilter,
                UsernamePasswordAuthenticationFilter.class
            );

        return http.build();
    }
}
