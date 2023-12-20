package ntou.cse.ntoueventregistrationsystem.event;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.time.LocalDateTime;

@Document("events")
public class Event implements Serializable {
    @Id
    private String id;
    private String title;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String describe;
    private String from;
    private String venue;
    private String creatorId;
    private boolean restrict;
    private int rollcall;
    private LocalDateTime rollcallEndTime;
    private int maxPeople;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }

    public LocalDateTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalDateTime endTime) {
        this.endTime = endTime;
    }

    public String getDescribe() {
        return describe;
    }

    public void setDescribe(String describe) {
        this.describe = describe;
    }

    public String getFrom() {
        return from;
    }

    public void setFrom(String from) {
        this.from = from;
    }

    public String getVenue() {
        return venue;
    }

    public void setVenue(String venue) {
        this.venue = venue;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCreatorId() {
        return creatorId;
    }

    public boolean isRestrict() {
        return restrict;
    }

    public void setCreatorId(String creatorId) {
        this.creatorId = creatorId;
    }

    public void setRestrict(boolean restrict) {
        this.restrict = restrict;
    }

    public int getRollcall() {
        return rollcall;
    }

    public void setRollcall(int rollcall) {
        this.rollcall = rollcall;
    }

    public LocalDateTime getRollcallEndTime() {
        return rollcallEndTime;
    }

    public void setRollcallEndTime(LocalDateTime rollcallEndTime) {
        this.rollcallEndTime = rollcallEndTime;
    }

    public int getMaxPeople() {
        return maxPeople;
    }

    public void setMaxPeople(int maxPeople) {
        this.maxPeople = maxPeople;
    }
}
