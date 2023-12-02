package ntou.cse.ntoueventregistrationsystem.email;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/email")
public class EmailController {
    private final EmailService service;

    @Autowired
    public EmailController(EmailService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Void> sendEmail(@RequestParam String subject, @RequestParam String text, @RequestParam String eventId) {
        service.sendEmail(subject, text, eventId);
        return ResponseEntity.ok().build();
    }
}
