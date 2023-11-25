package ntou.cse.ntoueventregistrationsystem.login;

public class LoginResponse {
    private String accessToken;

    private String authority;
    private String username;
    private String name;

    public LoginResponse(String accessToken, String authority, String username, String name) {
        this.accessToken = accessToken;
        this.authority = authority;
        this.username = username;
        this.name = name;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getAuthority() {
        return authority;
    }

    public void setAuthority(String authority) {
        this.authority = authority;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
