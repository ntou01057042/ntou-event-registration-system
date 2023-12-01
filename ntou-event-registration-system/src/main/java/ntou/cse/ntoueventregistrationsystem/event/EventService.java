package ntou.cse.ntoueventregistrationsystem.event;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public List<Event> getEventsByTitleLike(String keyword) {
        return repository.findAllByTitleLike(keyword);
    }
    public void swapState(String id){
        Event event = repository.findById(id).get();
        event.setRestrict((event.isRestrict() ? false : true));
        repository.save(event);
    }
}
