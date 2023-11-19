package ntou.cse.ntoueventregistrationsystem.entity;

public class Participant {
    private String name;
    private String studentID;
    private String email;
    private String phoneNumber;

    public Participant() {
    }

    public Participant(String name, String studentID, String email, String phoneNumber) {
        this.name = name;
        this.studentID = studentID;
        this.email = email;
        this.phoneNumber = phoneNumber;
    }
    
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getStudentID() {
        return studentID;
    }
    public void setStudentID(String studentID) {
        this.studentID = studentID;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPhoneNumber() {
        return phoneNumber;
    }
    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
}
