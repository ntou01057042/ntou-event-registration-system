package ntou.cse.ntoueventregistrationsystem.event;

import com.opencsv.CSVWriter;
import jakarta.servlet.http.HttpServletResponse;
import ntou.cse.ntoueventregistrationsystem.event.Event;
import ntou.cse.ntoueventregistrationsystem.entity.Participant;
import ntou.cse.ntoueventregistrationsystem.event.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class EventService {
    private final EventRepository repository;

    @Autowired
    public EventService(EventRepository repository) {
        this.repository = repository;
    }

    public List<Event> getAllEvents() {
        return repository.findAll();
    }

    public List<Event> getEventsByTitleLike(String keyword) {
        return repository.findByTitleLike(keyword);
    }

    public void createEvent(Event event) {
        repository.insert(event);
    }

    public Event getEventBy(String id) {
        Optional<Event> event = repository.findById(id);
        return (Event) event.orElse(null);
    }

    public void updateEvent(Event event) {
        repository.save(event);
    }

    public void deleteEvent(String id) {
        repository.deleteById(id);
    }

    public Event register(String id, Participant participant){
        Event oldEvent = repository.findById(id).get();
        ArrayList<Participant> newParticipant = oldEvent.getParticipant();
        newParticipant.add(participant);

        Event newEvent = new Event(oldEvent.getTitle(), oldEvent.getStartTime(), oldEvent.getEndTime(), oldEvent.getDescribe(),
                            oldEvent.getFrom(), oldEvent.getVenue(), oldEvent.getId(), newParticipant);
        return repository.save(newEvent);
    }

    public void generateCSV(HttpServletResponse response, String id) throws IOException {
        response.setContentType("text/csv");
        response.setHeader("Content-Disposition", "attachment; file=report.csv");
        CSVWriter writer = new CSVWriter(response.getWriter());
        writer.writeNext(new String[] {"Name", "StudentID", "Email", "PhoneNumber"});

        Event event = repository.findById(id).get();
        ArrayList<Participant> participant = event.getParticipant();

        for(Participant p : participant)
            writer.writeNext(new String[] {p.getName(), "\t" + p.getStudentID(), "\t" + p.getEmail(), "\t" + p.getPhoneNumber()});

        writer.close();
    }

    public void updateComments(Event event) {
        repository.save(event);
    }
}
