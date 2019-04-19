package springapp.command;

import com.fasterxml.jackson.annotation.JsonCreator;

public class LoginCommand {

    private String username;
    private String password;

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }
}
