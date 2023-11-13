package ntou.cse.ntoueventregistrationsystem.controller;

import ntou.cse.ntoueventregistrationsystem.entity.Event;
import ntou.cse.ntoueventregistrationsystem.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
        service.createEvent(event);
    }
}
