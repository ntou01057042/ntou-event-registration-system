package ntou.cse.ntoueventregistrationsystem.appuser;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TokenController {
    private final TokenService service;

    @Autowired
    public TokenController(TokenService service) {
        this.service = service;
    }

    @PostMapping("auth/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        return service.createToken(request);
    }
}
