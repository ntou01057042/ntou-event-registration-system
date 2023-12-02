package ntou.cse.ntoueventregistrationsystem.block;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BlockRepository extends MongoRepository<Block, String> {

    boolean existsByUserIdAndTargetId(String userId, String targetId);
}