package ntou.cse.ntoueventregistrationsystem.registration;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("registrations")
public class Registration {
    @Id
    private String id;
    private String eventId;
    private String userId;
    private String email;

    public Registration() {
    }

    public Registration(String eventId, String userId, String email) {
        this.eventId = eventId;
        this.userId = userId;
        this.email = email;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEventId() {
        return eventId;
    }

    public void setEventId(String eventId) {
        this.eventId = eventId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
