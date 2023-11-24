package ntou.cse.ntoueventregistrationsystem.registration;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface RegistrationRepository extends MongoRepository<Registration, String> {
    ArrayList<Registration> findAllByEventId(String id);
//    boolean existsByEventIdAndUserId(String eventId, String userId);
}
