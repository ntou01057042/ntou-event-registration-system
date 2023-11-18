package ntou.cse.ntoueventregistrationsystem.service;

import ntou.cse.ntoueventregistrationsystem.entity.Event;
import ntou.cse.ntoueventregistrationsystem.entity.Participant;
import ntou.cse.ntoueventregistrationsystem.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.List;
import java.util.*;
import com.opencsv.CSVWriter;


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
    public void generateCSV(HttpServletResponse response, String id) throws IOException{
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
}
