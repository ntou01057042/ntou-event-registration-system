package ntou.cse.ntoueventregistrationsystem.user;

import ntou.cse.ntoueventregistrationsystem.user.AppUser;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

public record CustomUserDetails(AppUser appUser) implements UserDetails {
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(appUser().getAuthority());
    }

    @Override
    public String getPassword() {
        return appUser().getPassword();
    }

    @Override
    public String getUsername() {
        return appUser().getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return appUser().getEnabled();
    }

    public String getName() {
        return appUser().getName();
    }
}
