package springapp.domain;

public class Client {
	private final Integer id;
	private final String name;
	private final String phoneNumber;
	private final String address;
	

	public Client(Integer id, String name, String phoneNumber, String address) {
		this.id = id;
		this.name = name;
		this.phoneNumber = phoneNumber;
		this.address = address;
	}

	
	public String getName() {
		return name;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public String getAddress() {
		return address;
	}

	public Integer getId() {
		return id;
	}
	
	
}
