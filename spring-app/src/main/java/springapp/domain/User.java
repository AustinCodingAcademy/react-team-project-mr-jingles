package springapp.domain;

public class User {
	private final Integer id;
	private final String username;
	private final String encodedPassword;
	private final Role role;

	public User(Integer id, String username, String encodedPassword, Role role) {
		this.id = id;
		this.username = username;
		this.encodedPassword = encodedPassword;
		this.role = role;
	}

	
	public String getUsername() {
		return username;
	}

	public String getEncodedPassword() {
		return encodedPassword;
	}

	public Integer getId() {
		return id;
	}
	
	public Role getRole() {
		return role;
	}
	
	
}
