package springapp.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import springapp.command.PetCommand;
import springapp.dao.PetDao;
import springapp.domain.Client;
import springapp.domain.Pet;


@Service
public class PetService {

	@Autowired 
	PetDao petDao;
	
	public List<Pet> getPets(){
		return petDao.list();
		
	}

	public Pet deletePet(Integer id) {
		Pet pet = getPet(id);
		if(pet != null) {
			petDao.delete(id);
		}
		return null;
	}

	public Pet getPet(String id) {
		return petDao.get(Integer.parseInt(id));
	}
	
	public Pet getPet(Integer id) {
		return petDao.get(id);
	}
	
	public Pet savePet(PetCommand command) {
		Pet newPet = new Pet(command.getId(), command.getName(), command.getGender(), command.isAltered(), command.getClientId());
		return petDao.save(newPet);
	}
}
