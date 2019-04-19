package springapp.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import springapp.command.PetCommand;
import springapp.domain.Pet;
import springapp.service.PetService;

/**
 * This controller handles all pet related pages
 *
 * Notice the @PreAuthorize annotations on the methods
 */
@RestController
@RequestMapping("/api/pets") //notice that this path is set at the class level.
public class PetRestController {

    private Logger logger = LoggerFactory.getLogger(PetRestController.class);
	
    // Inject in a PetService class
	@Autowired
	PetService petService;

    /**
     * Returns the list of pets
     * @return the list of pets
     */
	 @PreAuthorize("hasAuthority('LIST_PETS')")
	 @GetMapping
	 public List<Pet> listPets() {
        return petService.getPets();
    }


    /**
     * @param id the id of the pet to fetch
     * @return the pet matching the id
     */
	 @PreAuthorize("hasAuthority('GET_PET')")
	 @GetMapping("/{id}")
	 public Pet getPet(@PathVariable("id") int id) {
		return petService.getPet(id);
	}

    /**
     * Saves a new pet
     * @param command the information about the new pet we are saving
     * @return the newly created pet
     */
	 @PreAuthorize("hasAuthority('SAVE_PET')")
	 @PostMapping
	 public Pet newPet(@RequestBody PetCommand command) {
		 
		 if(command.getId() != null) {
			 throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, "Cannot pass in a pet id when creating a new pet");
		 }
		 
	     //NOTE: if we want to capture errors correctly, we would wrap the following code in a try/catch
         // and the catch would add a nice error message to the mode
         // then the view template would render a nice error message

	     // we pass the command to the service, and it nows how update/create a pet
         // the service returns the new pet object back to us after the save
	     Pet pet = petService.savePet(command);
	     return pet;

     }

	    /**
	     * Update an existing pet
	     * @param command the information about the pet we are saving
	     * @return the updated pet
	     */
		 @PreAuthorize("hasAuthority('SAVE_PET')")
		 @PutMapping
		 public Pet updatePet(@RequestBody PetCommand command) {
			 
			 if(command.getId() == null) {
				 throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, "Cannot update a pet without an id");
			 }
			 
		     //NOTE: if we want to capture errors correctly, we would wrap the following code in a try/catch
	         // and the catch would add a nice error message to the mode
	         // then the view template would render a nice error message

		     // we pass the command to the service, and it nows how update/create a pet
	         // the service returns the new pet object back to us after the save
		     Pet pet = petService.savePet(command);
		     return pet;

	     }

	 
    /**
     * Deletes a pet and redirects to list pets page
     * @param id the id of the pet to delete
     * @param redirectAttributes we use this instead of a Model object, because we want to pass
     *                           some attributes to the list page
     * @return redirect path to the list pets page
     */
     @PreAuthorize("hasAuthority('DELETE_PET')")
	 @DeleteMapping("/{id}")
	 public Pet deletePet(@PathVariable("id") int id, RedirectAttributes redirectAttributes) {
         // NOTE to handle exceptions, we would wrap the following code in a try/catch
         // and in the catch forward to a different page
    	 
         // send the id passed in to the pet service
         return petService.deletePet(id);

    }

}
