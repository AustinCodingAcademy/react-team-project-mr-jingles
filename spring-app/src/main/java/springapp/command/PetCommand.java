package springapp.command;

import springapp.domain.Client;
import springapp.domain.Gender;
import springapp.domain.Pet;

/**
 * The command object is use when passing data back and forth between the client and server
 */
public class PetCommand {
	
	private Integer id;
	private String name;
	private boolean altered;
	private Gender gender;
	private Integer clientId;
	private Client client;

	/**
	 * Initialise an empty pet command with the client id set
	 * @param clientId the client id
	 */
	public PetCommand(Integer clientId) {
		this.clientId = clientId;
	}

	/**
	 * Initialize the pet command to match the pet passed in
	 * @param pet the pet to initialize the command from
	 */
	public PetCommand(Pet pet) {
		if (pet != null) {
			this.clientId = pet.getClientId();
			this.id = pet.getId();
			this.name = pet.getName();
			this.altered = pet.isAltered();
			this.gender = pet.getGender();
		}
	}

	/**
	 * An empty constructor for the pet command
	 */
	public PetCommand() {}

	/**
	 * @return the pet id, null if the pet is not persisted to the database yet (ie a new pet)
	 */
	public Integer getId() {
		return id;
	}

	/**
	 * Set the pet id, should be null if this is a new pet
	 * @param id the pet id
	 */
	public void setId(Integer id) {
		this.id = id;
	}

	/**
	 * @return the  pet name
	 */
	public String getName() {
		return name;
	}

	/**
	 * Set the pet name
	 * @param name the pet name
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * @return true if the pet is altered, otherwise returns false
	 */
	public boolean isAltered() {
		return altered;
	}

	/**
	 * Set a flag indicating if the pet is altered or not
	 * @param altered flag should be true if the pet is altered, false otherwise
	 */
	public void setAltered(boolean altered) {
		this.altered = altered;
	}

	/**
	 * @return Gender of the pet
	 */
	public Gender getGender() {
		return gender;
	}

	/**
	 * Set the gender of the pet
	 * @param gender the gender of the pet
	 */
	public void setGender(Gender gender) {
		this.gender = gender;
	}

	/**
	 * @return the id of the client associated with the pet
	 */
	public Integer getClientId() {
		return clientId;
	}

	/**
	 * Set the id of the client associated with the pet
	 * @param clientId the client id
	 */
	public void setClientId(Integer clientId) {
		this.clientId = clientId;
	}

	/**
	 * @return the client object associated with the pet
	 */
	public Client getClient() {
		return client;
	}

	/**
	 * Set the client associated with the pet
	 * @param client the client
	 */
	public void setClient(Client client) {
		this.client = client;
	}
	
	
	
	
	
	

}
