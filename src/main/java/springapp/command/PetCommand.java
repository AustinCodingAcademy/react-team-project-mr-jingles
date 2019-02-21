package springapp.command;

import springapp.domain.Client;
import springapp.domain.Gender;
import springapp.domain.Pet;

public class PetCommand {
	
	private Integer id;
	private String name;
	private boolean altered;
	private Gender gender;
	private Integer clientId;
	private Client client;
	
	public PetCommand(Integer clientId) {
		this.clientId = clientId;
	}
	
	public PetCommand(Pet pet) {
		this.clientId = pet.getClientId();
		this.id = pet.getId();
		this.name = pet.getName();
		this.altered = pet.isAltered();
		this.gender =pet.getGender();
	}
	
	public PetCommand() {}
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public boolean isAltered() {
		return altered;
	}
	public void setAltered(boolean altered) {
		this.altered = altered;
	}
	public Gender getGender() {
		return gender;
	}
	public void setGender(Gender gender) {
		this.gender = gender;
	}
	public Integer getClientId() {
		return clientId;
	}
	public void setClientId(Integer clientId) {
		this.clientId = clientId;
	}
	public Client getClient() {
		return client;
	}
	public void setClient(Client client) {
		this.client = client;
	}
	
	
	
	
	
	

}
