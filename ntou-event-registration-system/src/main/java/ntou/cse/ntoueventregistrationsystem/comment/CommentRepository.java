package ntou.cse.ntoueventregistrationsystem.comment;

import ntou.cse.ntoueventregistrationsystem.comment.Comment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends MongoRepository<Comment, String> {
    List<Comment> findAllByEventId(String id);
}
