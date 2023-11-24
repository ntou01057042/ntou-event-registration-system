package ntou.cse.ntoueventregistrationsystem.registration;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/registrations")
public class RegistrationController {
    private final RegistrationService service;

    @Autowired
    public RegistrationController(RegistrationService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Void> postRegistration(@RequestBody Registration registration) {
        service.createRegistration(registration);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/export/{id}")
    public void exportToCSV(HttpServletResponse response, @PathVariable String id) throws IOException {
        service.generateCSV(response, id);
    }
}
