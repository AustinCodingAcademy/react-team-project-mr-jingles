package springapp.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import springapp.command.ClientCommand;
import springapp.domain.Client;
import springapp.service.ClientService;

@Controller
public class SecurityController {
	
	@GetMapping("/")
	 public String getClient() {
       return "home";
	}

	@GetMapping("/login")
	 public String login() {
      return "login";
	}
	

}