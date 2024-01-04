package ntou.cse.ntoueventregistrationsystem.user;

import ntou.cse.ntoueventregistrationsystem.event.Event;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

import static ntou.cse.ntoueventregistrationsystem.user.Authority.ADVANCED;

@Service
public class AppUserService {
    private final AppUserRepository repository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AppUserService(AppUserRepository repository, PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    public boolean createAppUser(AppUser appUser) {
        if (repository.existsByEmail(appUser.getEmail())) {
            return false;
        } else {
            appUser.setPassword(passwordEncoder.encode(appUser.getPassword()));
            repository.insert(appUser);
            return true;
        }
    }

    public void elevateAuthorityToAdvanced(String id) {
        Optional<AppUser> user = repository.findById(id);
        if (user.isPresent()) {
            user.get().setAuthority(ADVANCED);
            System.out.println(user.get().getAuthority());
            repository.save(user.get());
        }
    }

    public AppUser getAppUserBy(String id){
        Optional<AppUser> appUser = repository.findById(id);
        return (AppUser) appUser.orElse(null);
    }
}
