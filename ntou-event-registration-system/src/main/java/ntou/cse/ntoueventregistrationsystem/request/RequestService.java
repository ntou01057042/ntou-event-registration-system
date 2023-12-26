package ntou.cse.ntoueventregistrationsystem.request;

import ntou.cse.ntoueventregistrationsystem.user.AppUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RequestService {
    private final RequestRepository repository;
    private final AppUserService appUserService;

    @Autowired
    public RequestService(RequestRepository repository, AppUserService appUserService) {
        this.repository = repository;
        this.appUserService = appUserService;
    }

    public Request getRequestByUserId(String userId) {
        Optional<Request> request = repository.findByUserId(userId);
        return request.orElseGet(Request::new);
    }

    public boolean createRequest(Request request) {
        if (repository.existsByUserId(request.getUserId())) {
            return false;
        } else {
            repository.insert(request);
            return true;
        }
    }

    public List<Request> getAllRequests() {
        return repository.findAll();
    }

    public boolean updateRequest(String id, boolean approved) {
        Optional<Request> request = repository.findById(id);
        if (request.isPresent()) {
            if (approved) {
                appUserService.elevateAuthorityToAdvanced(request.get().getUserId());
                repository.deleteById(id);
            } else {
                request.get().setStatus("rejected");
                repository.save(request.get());
            }
            return true;
        } else {
            return false;
        }
    }

    public void deleteRequestById(String id) {
        repository.deleteById(id);
    }
}
