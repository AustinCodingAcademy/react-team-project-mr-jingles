package springapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import springapp.command.ClientCommand;
import springapp.domain.Client;
import springapp.service.ClientService;

@Controller
@RequestMapping("/clients")
public class ClientController {
	
	@Autowired
	ClientService clientService;
	
	@GetMapping
	 public String listClients(Model model) {
        List<Client> clients = clientService.getClients();
		model.addAttribute("clients", clients);
        return "clients/listClients";
    }
	
	
	@GetMapping("/{id}")
	 public String getClient(@PathVariable("id") String id, Model model) {
		if(id.equals("new")) {
			model.addAttribute("command", new ClientCommand(null));	
		} else {
			Client client = clientService.getClient(id);
			model.addAttribute("command", new ClientCommand(client));
			model.addAttribute("pets", clientService.getPets(client.getId()) );
		}
		return "clients/editClient";
	}
	
	@PostMapping
	 public String saveClient(ClientCommand command, Model model) {
		
	      Client client = clientService.saveClient(command);
	      model.addAttribute("command", new ClientCommand(client));
	      model.addAttribute("pets", clientService.getPets(client.getId()) );
		  model.addAttribute("saved", true);
	      return "clients/editClient";
		  
     }
	
	@GetMapping("/{id}/delete")
	 public String deleteClient(@PathVariable("id") String id, RedirectAttributes redirectAttributes) {
	   
		clientService.deleteClient(id);
		redirectAttributes.addFlashAttribute("deleted", true);

		return "redirect:/clients";
	  
    }

}
