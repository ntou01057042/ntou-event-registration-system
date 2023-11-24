package ntou.cse.ntoueventregistrationsystem.comment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {
    private final CommentRepository repository;

    @Autowired
    public CommentService(CommentRepository repository) {
        this.repository = repository;
    }

    public List<Comment> getComments(String id) {
        return repository.findAllByEventId(id);
    }

    public void createComment(Comment comment) {
        repository.save(comment);
    }
}
