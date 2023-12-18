package ntou.cse.ntoueventregistrationsystem.registration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class RegistrationService {
    private final RegistrationRepository repository;

    @Autowired
    public RegistrationService(RegistrationRepository repository) {
        this.repository = repository;
    }

    public void createRegistration(Registration registration) {
        // if (repository.existsByEventIdAndUserId(registration.getEventId(),
        // registration.getUserId())) {
        // throw new UnprocessableEntityException("This user has already registered for
        // this event.");
        // }
        repository.save(registration);
    }

    public ArrayList<Registration> getAllRegistrationsByEventId(String eventId) {
        return repository.findAllByEventId(eventId);
    }

    public void deleteRegistration(String id) {
        repository.deleteById(id);
    }

    public ArrayList<Registration> getAllRegistrationByUserId(String userId) {
        return repository.findAllByUserId(userId);
    }
    public void updateAttendance(String id){
        Registration registration = repository.findById(id).get();
        registration.setAttendance(true);
        repository.save(registration);
    }
}
