package ntou.cse.ntoueventregistrationsystem.event;

import ntou.cse.ntoueventregistrationsystem.event.Event;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventRepository extends MongoRepository<Event, String> {
    List<Event> findByTitleLike(String keyword);
}
