package ntou.cse.ntoueventregistrationsystem.controller;

import ntou.cse.ntoueventregistrationsystem.entity.Event;
import ntou.cse.ntoueventregistrationsystem.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

    @PutMapping("/{id}")
    public void putComment(@PathVariable("id") String id, @RequestBody String comment){
        Event event = service.getEventBy(id);
        ArrayList<String> comments = event.getComments();
        comments.add(comment);
        service.updateComments(event);
    }
}
