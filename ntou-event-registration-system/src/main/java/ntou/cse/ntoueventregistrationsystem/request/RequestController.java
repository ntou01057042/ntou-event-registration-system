package ntou.cse.ntoueventregistrationsystem.request;

import ntou.cse.ntoueventregistrationsystem.user.CustomUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/requests")
public class RequestController {
    private final RequestService service;

    @Autowired
    public RequestController(RequestService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<Request> getRequest(@AuthenticationPrincipal CustomUserDetails userDetails) {
        return ResponseEntity.ok(service.getRequestByUserId(userDetails.getId()));
    }

    @PostMapping
    public ResponseEntity<Void> postRequest(@RequestBody Request request) {
        return service.createRequest(request) ? ResponseEntity.ok().build() :
                ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }

    @GetMapping("/all")
    public ResponseEntity<List<Request>> getRequests() {
        return ResponseEntity.ok(service.getAllRequests());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> putRequests(@PathVariable("id") String id, @RequestParam boolean approved) {
        return service.updateRequest(id, approved) ? ResponseEntity.ok().build()
                : ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }
}
