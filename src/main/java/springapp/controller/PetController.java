package springapp.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import springapp.command.PetCommand;
import springapp.dao.ClientDao;
import springapp.domain.Client;
import springapp.domain.Pet;
import springapp.service.ClientService;
import springapp.service.PetService;

@Controller
@RequestMapping("/pets")
public class PetController {
	
	private Logger logger = LoggerFactory.getLogger(PetController.class);

	@Autowired
	PetService petService;
	
	@Autowired
	ClientService clientService;

	
	@PreAuthorize("hasAuthority('LIST_PETS')")
	@GetMapping
	 public String listPets(Model model) {
        List<Pet> pets = petService.getPets();
		model.addAttribute("pets", pets);
        return "pets/listPets";
    }

	@PreAuthorize("hasAuthority('GET_PET')")
	@GetMapping("/{id}")
	public String getPet(@PathVariable("id") String id,
						 @RequestParam(name="clientId", required=false) Integer clientId,
						 Model model) {
		
		model.addAttribute("fromClientPage", clientId != null);

		if(id.equals("new") && clientId == null) {
			throw new IllegalArgumentException("Cannot add a new pet without a clientid");
		}
		
		PetCommand petCommand;
		if(id.equals("new")) {
			petCommand = new PetCommand(clientId);
			
		} else {
			Pet pet = petService.getPet(id);
			petCommand = new PetCommand(pet);
		}
		
		Client client = clientService.getClient(petCommand.getClientId());
		petCommand.setClient(client);			
		
		model.addAttribute("command", petCommand);
		return "pets/editPet";
	}

	@PreAuthorize("hasAuthority('SAVE_PET')")
	@PostMapping
	 public String savePet(PetCommand command, Model model, boolean fromClientPage) {
		  model.addAttribute("fromClientPage", fromClientPage);
		
	      Pet pet = petService.savePet(command);
	      command = new PetCommand(pet);
	      Client client = clientService.getClient(pet.getClientId());
	      command.setClient(client);
	      
	      model.addAttribute("command", command);
		  model.addAttribute("saved", true);
	      return "pets/editPet";
		  
    }

	@PreAuthorize("hasAuthority('DELETE_PET')")
	@GetMapping("/{id}/delete")
	public String deletePet(@PathVariable("id") String id,
							@RequestParam(name="clientId", required=false) Integer clientId,
							RedirectAttributes redirectAttributes) {

		petService.deletePet(id);
		redirectAttributes.addFlashAttribute("deleted", true);

		if(clientId != null){
			return "redirect:/clients/"+clientId;
		}
		return "redirect:/pets";

	}
}
