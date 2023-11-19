package ntou.cse.ntoueventregistrationsystem.login;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginResponseController {
    private final LoginResponseService service;

    @Autowired
    public LoginResponseController(LoginResponseService service) {
        this.service = service;
    }

    @PostMapping("auth/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        return service.createToken(request);
    }
}
