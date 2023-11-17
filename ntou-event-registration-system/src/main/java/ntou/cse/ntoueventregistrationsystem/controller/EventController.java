package ntou.cse.ntoueventregistrationsystem.controller;

import ntou.cse.ntoueventregistrationsystem.entity.Event;
import ntou.cse.ntoueventregistrationsystem.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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
    @GetMapping("/getById")
    public Event getEvent(@RequestParam String id) {
        return service.getEventBy(id);
    }
    @PutMapping("/{id}")
    public Event putEvent(@PathVariable("id") String id, @RequestParam("title") String newTitle){
        Event event = service.getEventBy(id);
        service.updateEventTitle(event, newTitle);
        return service.getEventBy(id);
    }
//    TODO
//    @DeleteMapping("/{id}")
}
