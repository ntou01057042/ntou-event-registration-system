package ntou.cse.ntoueventregistrationsystem.registration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/registrations")
public class RegistrationController {
    private final RegistrationService service;

    @Autowired
    public RegistrationController(RegistrationService service) {
        this.service = service;
    }

    @PostMapping("/{userId}")
    public ResponseEntity<Void> postRegistration(@RequestBody Registration registration, @PathVariable String userId) {
        registration.setUserId(userId);
        service.createRegistration(registration);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/{eventId}")
    public ResponseEntity<ArrayList<Registration>> getRegistrations(@PathVariable String eventId) {
        return ResponseEntity.ok(service.getAllRegistrationsByEventId(eventId));
    }
}
