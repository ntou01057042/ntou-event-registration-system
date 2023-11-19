package ntou.cse.ntoueventregistrationsystem.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;

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
    private ArrayList<Participant> participant = new ArrayList<Participant>();

    public Event(String title, LocalDateTime startTime, LocalDateTime endTime, String describe, String from,
            String venue, String id, ArrayList<Participant> participant) {
        this.title = title;
        this.startTime = startTime;
        this.endTime = endTime;
        this.describe = describe;
        this.from = from;
        this.venue = venue;
        this.id = id;
        this.participant = participant;
    }

    public Event() {
    }

    public Event(String title, LocalDateTime startTime, LocalDateTime endTime, String describe, String from,
                 String venue) {
        this.title = title;
        this.startTime = startTime;
        this.endTime = endTime;
        this.describe = describe;
        this.from = from;
        this.venue = venue;
    }

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

    public void setParticipant(ArrayList<Participant> participant) {
        this.participant = participant;
    }

    public ArrayList<Participant> getParticipant() {
        return participant;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

}
