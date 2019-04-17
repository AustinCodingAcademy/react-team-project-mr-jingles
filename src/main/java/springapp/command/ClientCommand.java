package springapp.command;

import com.fasterxml.jackson.annotation.JsonCreator;

import springapp.domain.Client;

/**
 * This command class is used to pass information back and force between the client and the server
 * 
 */
public class ClientCommand {
	
	private Integer id;
	private String name;
	private String address;
	private String phoneNumber;

	/**
	 * Creates a command object that has the initial values the same as the client passed in
	 * @param client the client to initialize the command object with
	 */
	public ClientCommand(Client client) {
		if(client != null) {
			id = client.getId();
			this.name = client.getName();
			this.address = client.getAddress();
			this.phoneNumber = client.getPhoneNumber();
		}
	}

	/** 
	 * A default constructor that is used by jackson when deserializing a json object to a pojo
	 */
	@JsonCreator
	private ClientCommand() {
		
	}
	
	/**
	 * Set the id of the client
	 * @param id the client id, null if this client is not persisted to the database (ie a new client)
	 */
	public void setId(Integer id) {
		this.id = id;
	}

	/**
	 * Set the name of the client
	 * @param name the name of the client
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * Set the address of the client
	 * @param address the client address
	 */
	public void setAddress(String address) {
		this.address = address;
	}

	/**
	 * Set the phone number of the client
	 * @param phoneNumber the phone number
	 */
	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	/**
	 * @return the client id, returns null if this client is new and not persisted to the database yet
	 */
	public Integer getId() {
		return id;
	}

	/**
	 * @return the name of the client
	 */
	public String getName() {
		return name;
	}

	/**
	 * @return the client address
	 */
	public String getAddress() {
		return address;
	}

	/**
	 * @return the client phone number
	 */
	public String getPhoneNumber() {
		return phoneNumber;
	}
  
}
