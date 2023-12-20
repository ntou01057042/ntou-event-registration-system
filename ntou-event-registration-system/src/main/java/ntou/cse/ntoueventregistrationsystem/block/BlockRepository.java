package ntou.cse.ntoueventregistrationsystem.block;

import ntou.cse.ntoueventregistrationsystem.event.Event;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BlockRepository extends MongoRepository<Block, String> {

    boolean existsByUserIdAndTargetId(String userId, String targetId);
    List<Block> findAllByUserId(String userId);
    void deleteByUserIdAndTargetId(String userId, String targetId);
    Block getByEventId(String eventId);
}