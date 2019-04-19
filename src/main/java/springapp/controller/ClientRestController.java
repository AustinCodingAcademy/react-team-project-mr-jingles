package springapp.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.ui.Model;
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

import springapp.command.ClientCommand;
import springapp.domain.Client;
import springapp.service.ClientService;

/**
 * This controller handles all client related pages
 *
 * Notice the @PreAuthorize annotations on the methods
 */
@RestController
@RequestMapping("/api/clients") //notice that this path is set at the class level.
public class ClientRestController {

    private Logger logger = LoggerFactory.getLogger(ClientRestController.class);

    // Inject in a ClientService claass
	@Autowired
	ClientService clientService;

    /**
     * Returns the list of clients
     * @return the list of clients
     */
	 @PreAuthorize("hasAuthority('LIST_CLIENTS')")
	 @GetMapping
	 public List<Client> listClients() {
        return clientService.getClients();
    }


    /**
     * @param id the id of the client to fetch
     * @return the client matching the id
     */
	 @PreAuthorize("hasAuthority('GET_CLIENT')")
	 @GetMapping("/{id}")
	 public Client getClient(@PathVariable("id") int id) {
		return clientService.getClient(id);
	}

    /**
     * Saves a new client
     * @param command the information about the new client we are saving
     * @return the newly created client
     */
	 @PreAuthorize("hasAuthority('SAVE_CLIENT')")
	 @PostMapping
	 public Client newClient(@RequestBody ClientCommand command) {
		 
		 if(command.getId() != null) {
			 throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, "Cannot pass in a client id when creating a new client");
		 }
		 
	     //NOTE: if we want to capture errors correctly, we would wrap the following code in a try/catch
         // and the catch would add a nice error message to the mode
         // then the view template would render a nice error message

	     // we pass the command to the service, and it nows how update/create a client
         // the service returns the new client object back to us after the save
	     Client client = clientService.saveClient(command);
	     return client;

     }

	    /**
	     * Saves a new client
	     * @param command the information about the new client we are saving
	     * @return the newly created client
	     */
		 @PreAuthorize("hasAuthority('SAVE_CLIENT')")
		 @PutMapping
		 public Client updateClient(@RequestBody ClientCommand command) {
			 
			 if(command.getId() == null) {
				 throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, "Cannot update a client without an id");
			 }
			 
		     //NOTE: if we want to capture errors correctly, we would wrap the following code in a try/catch
	         // and the catch would add a nice error message to the mode
	         // then the view template would render a nice error message

		     // we pass the command to the service, and it nows how update/create a client
	         // the service returns the new client object back to us after the save
		     Client client = clientService.saveClient(command);
		     return client;

	     }

	 
    /**
     * Deletes a client and redirects to list clients page
     * @param id the id of the client to delete
     * @param redirectAttributes we use this instead of a Model object, because we want to pass
     *                           some attributes to the list page
     * @return redirect path to the list clients page
     */
     @PreAuthorize("hasAuthority('DELETE_CLIENT')")
	 @DeleteMapping("/{id}")
	 public Client deleteClient(@PathVariable("id") int id, RedirectAttributes redirectAttributes) {
         // NOTE to handle exceptions, we would wrap the following code in a try/catch
         // and in the catch forward to a different page
    	 
         // send the id passed in to the client service
         return clientService.deleteClient(id);

    }

}
