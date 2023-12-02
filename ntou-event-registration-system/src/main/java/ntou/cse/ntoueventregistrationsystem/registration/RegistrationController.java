package ntou.cse.ntoueventregistrationsystem.registration;

import ntou.cse.ntoueventregistrationsystem.user.CustomUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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

    @PostMapping
    public ResponseEntity<Void> postRegistration(@RequestBody Registration registration, @AuthenticationPrincipal CustomUserDetails userDetails) {
        registration.setUserId(userDetails.getId());
        service.createRegistration(registration);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/{eventId}")
    public ResponseEntity<ArrayList<Registration>> getRegistrations(@PathVariable String eventId) {
        return ResponseEntity.ok(service.getAllRegistrationsByEventId(eventId));
    }

    @DeleteMapping("/cancel/{id}")
    public ResponseEntity<Void> cancelRegistrations(@PathVariable("id") String id){
        service.deleteRegistration(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @GetMapping
    public ResponseEntity<ArrayList<Registration>> getRegistrations(@AuthenticationPrincipal CustomUserDetails userDetails){
        return ResponseEntity.ok(service.getAllRegistrationByUserId(userDetails.getId()));
    }
}
