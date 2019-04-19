package springapp.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import springapp.command.LoginCommand;
import springapp.service.SecurityService;

/**
 * Simple Controller that handles the home page and login/logout pages
 */
@Controller
public class SecurityController {


	@Autowired
	SecurityService securityService;

    /**
     * The login page does not change based on the model and is a "static" page
     * @return home page view template
     */
	@GetMapping("/")
	 public String getClient() {
       return "home";
	}

    /**
     * The login page does not change based on the model and is a "static" page
     * @return login page view template
     */
	@GetMapping("/login")
	 public String login() {
      return "login";
	}

	/**
	 * Returns a valid Signed JWT to use for subsequent requests
	 * @return Signed JWT
	 */
	@PostMapping(value = "/api/login")
	@ResponseBody
	public String login(@RequestBody LoginCommand command) {
		return securityService.jwtLogin(command);
	}

	/**
	 * Returns a refreshed JWT with extended time, and latest permissions
	 * @return Signed JWT
	 */
	@GetMapping(value = "/api/refresh")
	@ResponseBody
	@PreAuthorize("isAuthenticated()")
	public String refresh() {
		return securityService.jwtRefreshToken();
	}


}