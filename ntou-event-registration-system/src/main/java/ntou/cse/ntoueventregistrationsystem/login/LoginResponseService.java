package ntou.cse.ntoueventregistrationsystem.login;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import ntou.cse.ntoueventregistrationsystem.user.CustomUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;

@Service
public class LoginResponseService {
    private final AuthenticationProvider authenticationProvider;
    private final Key privatekey = Keys.hmacShaKeyFor("thisistheprivatekeyforjwtsignature".getBytes());

    @Autowired
    public LoginResponseService(AuthenticationProvider authenticationProvider) {
        this.authenticationProvider = authenticationProvider;
    }

    public LoginResponse createToken(LoginRequest request) {
        Authentication authenticationToken = new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword());
        CustomUserDetails userDetails = (CustomUserDetails) authenticationProvider.authenticate(authenticationToken).getPrincipal();
        return new LoginResponse(
                createAccessToken(userDetails.getUsername()),
                userDetails.getAuthority().name(),
                userDetails.getUsername(),
                userDetails.getName()
        );
    }

    private String createAccessToken(String username) {
        return Jwts.builder()
                .subject("Access Token")
                .expiration(new Date(new Date().getTime() + 600 * 1000))
                .issuedAt(new Date())
                .claim("username", username)
                .signWith(privatekey)
                .compact();
    }
}
