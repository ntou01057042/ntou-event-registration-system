package ntou.cse.ntoueventregistrationsystem.comment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comments")
public class CommentController {
    private final CommentService service;

    @Autowired
    public CommentController(CommentService service) {
        this.service = service;
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<Comment>> getComments(@PathVariable String id) {
        return ResponseEntity.ok(service.getComments(id));
    }

    @PostMapping
    public ResponseEntity<Void> postComment(@RequestBody Comment comment) {
        service.createComment(comment);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
    @PostMapping("/{id}")
    public void reportComment(@PathVariable String id){
        service.prosecuteComment(id);
    }
    @GetMapping
    public ResponseEntity<List<Comment>> getReport(){
        return ResponseEntity.ok(service.getReport());
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteComment(@PathVariable String id){
        service.deleteComment(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
