package ntou.cse.ntoueventregistrationsystem.email;

import ntou.cse.ntoueventregistrationsystem.registration.Registration;
import ntou.cse.ntoueventregistrationsystem.registration.RegistrationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    private final JavaMailSender mailSender;
    private final RegistrationRepository registrationRepository;

    @Autowired
    public EmailService(JavaMailSender mailSender, RegistrationRepository registrationRepository) {
        this.mailSender = mailSender;
        this.registrationRepository = registrationRepository;
    }

    public void sendEmail(String subject, String text, String eventId) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setSubject(subject);
        message.setText(text);
        for (Registration registration : registrationRepository.findAllByEventId(eventId)) {
            message.setTo(registration.getEmail());
            mailSender.send(message);
        }
    }
}
