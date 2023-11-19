package ntou.cse.ntoueventregistrationsystem.controller;

import jakarta.servlet.http.HttpServletResponse;
import ntou.cse.ntoueventregistrationsystem.entity.Event;
import ntou.cse.ntoueventregistrationsystem.entity.Participant;
import ntou.cse.ntoueventregistrationsystem.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/events")
public class EventController {
    private final EventService service;

    @Autowired
    public EventController(EventService service) {
        this.service = service;
    }

    @GetMapping
    public List<Event> getEvents() {
        return service.getAllEvents();
    }

    @GetMapping("/search")
    public List<Event> getEvents(@RequestParam("keyword") String keyword) {
        return service.getEventsByTitleLike(keyword);
    }

    @PostMapping
    public void postEvent(@RequestBody Event event) {
        event.setComments(new ArrayList<String>());
        service.createEvent(event);
    }

    @GetMapping("/{id}")
    public Event getEvent(@PathVariable("id") String id) {
        return service.getEventBy(id);
    }

    @PutMapping
    public void putEvent(@RequestBody Event event) {
        service.updateEvent(event);
    }

    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable("id") String id) {
        service.deleteEvent(id);
    }

    @PostMapping("/register")
    public void registerEvent(@RequestParam("id") String id, @RequestBody Participant participant){
        service.register(id, participant);
    }

    @GetMapping("/export")
    public void exportToCSV(HttpServletResponse response, String id) throws IOException {
        service.generateCSV(response, id);
    }

    @PutMapping("/{id}")
    public void putComment(@PathVariable("id") String id, @RequestBody String comment){
        Event event = service.getEventBy(id);
        ArrayList<String> comments = event.getComments();
        comments.add(comment);
        service.updateComments(event);
    }
}
