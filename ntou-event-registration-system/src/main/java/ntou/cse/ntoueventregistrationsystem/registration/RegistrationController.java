package ntou.cse.ntoueventregistrationsystem.registration;

import ntou.cse.ntoueventregistrationsystem.block.BlockRepository;
import ntou.cse.ntoueventregistrationsystem.block.BlockService;
import ntou.cse.ntoueventregistrationsystem.event.EventService;
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
    private final BlockService blockService;
    private final EventService eventService;

    @Autowired
    public RegistrationController(RegistrationService service, BlockService blockService, EventService eventService) {
        this.service = service;
        this.blockService = blockService;
        this.eventService = eventService;
    }

    @PostMapping("/{eventId}")
    public ResponseEntity<Void> postRegistration(
            @PathVariable String eventId, @RequestParam String phoneNumber, @RequestParam String notes,
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        if(blockService.existsByUserIdAndTargetId(
                eventService.getEventBy(eventId).getCreatorId(),userDetails.getId())){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        Registration registration = new Registration(
                eventId,
                userDetails.getId(),
                userDetails.getName(),
                userDetails.getEmail(),
                phoneNumber,
                notes
        );
        service.createRegistration(registration);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/{eventId}")
    public ResponseEntity<ArrayList<Registration>> getRegistrations(@PathVariable String eventId) {
        return ResponseEntity.ok(service.getAllRegistrationsByEventId(eventId));
    }

    @DeleteMapping("/cancel/{id}")
    public ResponseEntity<Void> cancelRegistrations(@PathVariable("id") String id) {
        service.deleteRegistration(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @GetMapping
    public ResponseEntity<ArrayList<Registration>> getRegistrations(@AuthenticationPrincipal CustomUserDetails userDetails) {
        return ResponseEntity.ok(service.getAllRegistrationByUserId(userDetails.getId()));
    }
    @PostMapping("/attend/{id}")
    public void confirmAttendance(@PathVariable String id){
        service.updateAttendance(id);
    }
}
