package ntou.cse.ntoueventregistrationsystem.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AppUserService {
    private final AppUserRepository repository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AppUserService(AppUserRepository repository, PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    public Boolean createAppUser(AppUser appUser) {
        if (repository.existsByEmail(appUser.getEmail())) {
            return false;
        } else {
            appUser.setPassword(passwordEncoder.encode(appUser.getPassword()));
            repository.insert(appUser);
            return true;
        }
    }
}