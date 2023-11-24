package ntou.cse.ntoueventregistrationsystem.registration;

import com.opencsv.CSVWriter;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;

@Service
public class RegistrationService {
    private final RegistrationRepository repository;

    @Autowired
    public RegistrationService(RegistrationRepository repository) {
        this.repository = repository;
    }

    public void createRegistration(Registration registration) {
//        if (repository.existsByEventIdAndUserId(registration.getEventId(), registration.getUserId())) {
//            throw new UnprocessableEntityException("This user has already registered for this event.");
//        }
        repository.save(registration);
    }

    public void generateCSV(HttpServletResponse response, String id) throws IOException {
        response.setContentType("text/csv");
        response.setHeader("Content-Disposition", "attachment; file=report.csv");
        CSVWriter writer = new CSVWriter(response.getWriter());
        writer.writeNext(new String[] {"Name", "StudentID", "Email", "PhoneNumber"});

//        Event event = repository.findById(id).get();
//        ArrayList<Participant> participant = event.getParticipant();
        ArrayList<Registration> registrations = repository.findAllByEventId(id);

//        for (Participant p : participant)
//            writer.writeNext(new String[] {p.getName(), "\t" + p.getStudentID(), "\t" + p.getEmail(), "\t" + p.getPhoneNumber()});
        for (Registration registration : registrations) {
            writer.writeNext(new String[] {
                    registration.getName(),
                    "\t" + registration.getStudentID(),
                    "\t" + registration.getEmail(),
                    "\t" + registration.getPhoneNumber()
            });
        }

        writer.close();
    }
}
