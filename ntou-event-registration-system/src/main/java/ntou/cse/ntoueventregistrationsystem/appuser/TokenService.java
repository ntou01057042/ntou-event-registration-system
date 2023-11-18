package ntou.cse.ntoueventregistrationsystem.appuser;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;

@Service
public class TokenService {
    private final AuthenticationProvider authenticationProvider;
    private final SecretKey secretKey = Keys.hmacShaKeyFor("learninghowtousejjwttoimplementjwt".getBytes());

    @Autowired
    public TokenService(AuthenticationProvider authenticationProvider) {
        this.authenticationProvider = authenticationProvider;
    }

    public LoginResponse createToken(LoginRequest request) {
        Authentication authenticationToken = new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword());
        UserDetails userDetails = (UserDetails) authenticationProvider.authenticate(authenticationToken).getPrincipal();
        return new LoginResponse(createAccessToken(userDetails.getUsername()));
    }

    private String createAccessToken(String username) {
        return Jwts.builder()
                .subject("Access Token")
                .expiration(new Date(new Date().getTime() + 90 * 1000))
                .issuedAt(new Date())
                .claim("username", username)
                .signWith(secretKey)
                .compact();
    }
}
