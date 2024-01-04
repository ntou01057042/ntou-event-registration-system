package ntou.cse.ntoueventregistrationsystem.user;

import ntou.cse.ntoueventregistrationsystem.event.Event;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class AppUserController {
    private final AppUserService service;

    @Autowired
    public AppUserController(AppUserService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Void> postAppUser(@RequestBody AppUser appUser) {
        return service.createAppUser(appUser) ? ResponseEntity.ok().build() : ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }

    @GetMapping("/{id}")
    public AppUser getAppUser(@PathVariable("id") String id) {
        return service.getAppUserBy(id);
    }

}
