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
                        .requestMatchers(HttpMethod.POST, "/events").hasAnyAuthority("ADMIN", "ADVANCED")
                        .requestMatchers(HttpMethod.GET, "/events/?*").permitAll()
                        .requestMatchers(HttpMethod.GET, "/events/userEvent").hasAnyAuthority("ADMIN", "ADVANCED")
                        .requestMatchers(HttpMethod.PUT, "/events").hasAnyAuthority("ADMIN", "ADVANCED")
                        .requestMatchers(HttpMethod.DELETE, "/events/?*").hasAnyAuthority("ADMIN", "ADVANCED")
                        .requestMatchers(HttpMethod.POST, "/events/rollcall/?*").hasAnyAuthority("ADMIN", "ADVANCED")
                        .requestMatchers(HttpMethod.POST, "/events/register*").permitAll()
                        .requestMatchers(HttpMethod.POST, "/events/restrict/?*").hasAnyAuthority("ADMIN", "ADVANCED")
                        .requestMatchers(HttpMethod.POST, "/users").permitAll()
                        .requestMatchers(HttpMethod.POST, "/auth/login").permitAll()
                        .requestMatchers(HttpMethod.POST, "/registrations").hasAnyAuthority("ADMIN", "ADVANCED", "GENERAL")
                        .requestMatchers(HttpMethod.GET, "/registrations/?*").hasAnyAuthority("ADMIN", "ADVANCED")
                        .requestMatchers(HttpMethod.DELETE, "/registrations/cancel/?*").hasAnyAuthority("ADMIN", "ADVANCED", "GENERAL")
                        .requestMatchers(HttpMethod.GET, "/registrations").hasAnyAuthority("ADMIN", "ADVANCED", "GENERAL")
                        .requestMatchers(HttpMethod.GET, "/comments/?*").permitAll()
                        .requestMatchers(HttpMethod.POST, "/comments").hasAnyAuthority("ADMIN", "ADVANCED", "GENERAL")
                        .requestMatchers(HttpMethod.POST, "/blocks").hasAnyAuthority("ADMIN", "ADVANCED")
                        .requestMatchers(HttpMethod.GET, "/blocks").hasAnyAuthority("ADMIN", "ADVANCED")
                        .requestMatchers(HttpMethod.DELETE, "/blocks").hasAnyAuthority("ADMIN", "ADVANCED")
                        .requestMatchers(HttpMethod.POST, "/email").hasAnyAuthority("ADMIN", "ADVANCED")
                        .requestMatchers(HttpMethod.GET, "/requests").hasAnyAuthority("GENERAL")
                        .requestMatchers(HttpMethod.POST, "/requests").hasAnyAuthority("GENERAL")
                        .requestMatchers(HttpMethod.GET, "/requests/all").hasAnyAuthority("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/requests/?*").hasAnyAuthority("ADMIN")
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
