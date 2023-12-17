package ntou.cse.ntoueventregistrationsystem.request;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RequestRepository extends MongoRepository<Request, String> {
    Optional<Request> findByUserId(String userId);
    boolean existsByUserId(String userId);
}
