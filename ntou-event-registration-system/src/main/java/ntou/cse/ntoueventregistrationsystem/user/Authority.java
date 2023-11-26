package ntou.cse.ntoueventregistrationsystem.user;

import org.springframework.security.core.GrantedAuthority;

public enum Authority implements GrantedAuthority {
    ADMIN,
    ADVANCED,
    GENERAL;

    @Override
    public String getAuthority() {
        return name();
    }
}
