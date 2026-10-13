package com.jobportal;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.http.HttpMethod;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.jobportal.jwt.JwtAuthenticationEntryPoint;
import com.jobportal.jwt.JwtAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private JwtAuthenticationEntryPoint point;
    @Autowired
    private JwtAuthenticationFilter filter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.cors(Customizer.withDefaults())
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                // Preflight CORS requests - always allow
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                // Public endpoints - no auth required
                .requestMatchers("/auth/login", "/users/login", "/users/register",
                        "/users/verifyOtp/**", "/users/sendOtp/**", "/users/changePass").permitAll()

                // Employer-only: post and manage jobs, view applicants per job
                .requestMatchers(HttpMethod.POST, "/jobs/post", "/jobs/postAll", "/jobs/changeAppStatus").hasAnyAuthority("EMPLOYER", "ADMIN")
                .requestMatchers(HttpMethod.GET,  "/jobs/postedBy/**").hasAnyAuthority("EMPLOYER", "ADMIN")

                // Applicant-only: apply for jobs, view application history
                .requestMatchers(HttpMethod.POST, "/jobs/apply/**").hasAnyAuthority("APPLICANT", "ADMIN")
                .requestMatchers(HttpMethod.GET,  "/jobs/history/**").hasAnyAuthority("APPLICANT", "ADMIN")

                // All authenticated users: browse jobs, profiles, notifications
                .requestMatchers(HttpMethod.GET, "/jobs/getAll", "/jobs/get/**").authenticated()
                .requestMatchers("/profile/**", "/notifications/**").authenticated()

                // Everything else requires authentication
                .anyRequest().authenticated())
                .exceptionHandling(ex -> ex.authenticationEntryPoint(point))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        http.addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(List.of("http://localhost:*", "http://127.0.0.1:*"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
