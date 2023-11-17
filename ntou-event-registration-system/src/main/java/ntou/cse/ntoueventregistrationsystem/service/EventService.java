package ntou.cse.ntoueventregistrationsystem.service;

import ntou.cse.ntoueventregistrationsystem.entity.Event;
import ntou.cse.ntoueventregistrationsystem.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

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

    public void updateEventTitle(Event event, String title) {
        event.setTitle(title);
        repository.save(event);
    }

    public Event getEventBy(String id) {
        Optional event = repository.findById(id);
        return event.isPresent() ? (Event) event.get() : null;
    }
}
