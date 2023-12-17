package ntou.cse.ntoueventregistrationsystem.request;

import com.fasterxml.jackson.annotation.JsonCreator;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("requests")
public class Request {
    @Id
    private String id;
    private String userId;
    private String name;
    private String email;
    private String reason;
    private String status;

    public Request() {
    }

    @JsonCreator
    public Request(String userId, String name, String email, String reason) {
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.reason = reason;
        this.status = "pending";
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
