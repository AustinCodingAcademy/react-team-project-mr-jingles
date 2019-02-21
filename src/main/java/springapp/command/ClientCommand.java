package springapp.command;

import springapp.domain.Client;

public class ClientCommand {
	
	private Integer id;
	private String name;
	private String address;
	private String phoneNumber;

	
	
	public void setId(Integer id) {
		this.id = id;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public ClientCommand(Client client) {
		if(client != null) {
			id = client.getId();
			this.name = client.getName();
			this.address = client.getAddress();
			this.phoneNumber = client.getPhoneNumber();
		}
	}
	
	public Integer getId() {
		return id;
	}
	public String getName() {
		return name;
	}
	public String getAddress() {
		return address;
	}
	public String getPhoneNumber() {
		return phoneNumber;
	}
  
}
