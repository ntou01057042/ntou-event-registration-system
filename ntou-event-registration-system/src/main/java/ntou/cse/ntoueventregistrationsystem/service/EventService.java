package ntou.cse.ntoueventregistrationsystem.service;

import ntou.cse.ntoueventregistrationsystem.entity.Event;
import ntou.cse.ntoueventregistrationsystem.entity.Participant;
import ntou.cse.ntoueventregistrationsystem.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

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

    public Event register(String id, Participant participant){
        Event oldEvent = repository.findById(id).get();
        ArrayList<Participant> newParticipant = oldEvent.getParticipant();
        newParticipant.add(participant);

        Event newEvent = new Event(oldEvent.getTitle(), oldEvent.getStartTime(), oldEvent.getEndTime(), oldEvent.getDescribe(),
                            oldEvent.getFrom(), oldEvent.getVenue(), oldEvent.getId(), newParticipant);
        return repository.save(newEvent);
    }
}
