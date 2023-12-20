package ntou.cse.ntoueventregistrationsystem.comment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Sort;

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
    public void prosecuteComment(String id){
        Comment comment = repository.findById(id).get();
        comment.setReport(comment.getReport() + 1);
        repository.save(comment);
    }
    public List<Comment> getReport(){
        return repository.findAll(Sort.by(Sort.Order.desc("report")));
    }
    public void deleteComment(String id){
        repository.deleteById(id);
    }
    public void resetReport(String id){
        Comment comment = repository.findById(id).get();
        comment.setReport(0);
        repository.save(comment);
    }
}
