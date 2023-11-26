package ntou.cse.ntoueventregistrationsystem.event;

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

    @PostMapping
    public void postEvent(@RequestBody Event event) {
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

    @GetMapping("/search")
    public List<Event> getEvents(@RequestParam("keyword") String keyword) {
        return service.getEventsByTitleLike(keyword);
    }

    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable("id") String id) {
        service.deleteEvent(id);
    }

//    @GetMapping("/export")
//    public void exportToCSV(HttpServletResponse response, String id) throws IOException {
//        service.generateCSV(response, id);
//    }
}
