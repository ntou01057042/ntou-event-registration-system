package ntou.cse.ntoueventregistrationsystem.auth;

import ntou.cse.ntoueventregistrationsystem.user.CustomUserDetailsService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, JwtAuthenticationFilter jwtAuthenticationFilter) throws Exception {
        http
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(HttpMethod.GET, "/events").permitAll()
                        .requestMatchers(HttpMethod.POST, "/events").permitAll()
                        .requestMatchers(HttpMethod.GET, "/events/?*").permitAll()
                        .requestMatchers(HttpMethod.PUT, "/events").permitAll()
                        .requestMatchers(HttpMethod.DELETE, "/events/?*").permitAll()
                        .requestMatchers(HttpMethod.POST, "/events/register*").permitAll()
                        .requestMatchers(HttpMethod.PUT, "/events/?*").permitAll()
                        .requestMatchers(HttpMethod.POST, "/users").permitAll()
                        .requestMatchers(HttpMethod.POST, "/auth/login").permitAll()
                        .requestMatchers(HttpMethod.POST, "/registrations").permitAll()
                        .requestMatchers(HttpMethod.GET, "/registrations/export/?*").permitAll()
                        .requestMatchers(HttpMethod.GET, "/comments/?*").permitAll()
                        .requestMatchers(HttpMethod.POST, "/comments").permitAll()
                        .requestMatchers(HttpMethod.GET, "/**").permitAll()   // front page
                        .anyRequest().authenticated()
                )
                .csrf(AbstractHttpConfigurer::disable)
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationProvider authenticationProvider(PasswordEncoder passwordEncoder,
                                                         CustomUserDetailsService userDetailsService) {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider(passwordEncoder);
        authenticationProvider.setUserDetailsService(userDetailsService);
        return authenticationProvider;
    }
}
