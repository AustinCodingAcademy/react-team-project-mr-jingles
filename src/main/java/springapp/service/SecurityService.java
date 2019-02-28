package springapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import springapp.dao.SecurityDao;
import springapp.domain.Permission;
import springapp.domain.User;

import java.util.ArrayList;
import java.util.List;

/**
 * Our implementaion of the UserDetailsService that the security framework expects.
 */
@Service
public class SecurityService implements UserDetailsService {

	@Autowired
	SecurityDao securityDao;

	/**
	 *
	 * NOTE: this method is not checking the password,
	 * but it does return the encoded password that the security framework can use to check the password against
	 *
	 * Our implementation of getting a UserDetails object from our database
	 * @param username the username to fetch the user details for
	 * @return the user details
	 * @throws UsernameNotFoundException if the user was not found in the database
	 */
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
	
		User user = securityDao.getUserByUsername(username);
		if(user == null) {
			throw new UsernameNotFoundException("No user found for "+username);
		}
		
		List<Permission> permissions = new ArrayList<>();
		if(user.getRole() != null) {
			permissions = user.getRole().getPermissions();
		}


		return new org.springframework.security.core.userdetails.User(username, user.getEncodedPassword(), permissions);
	}
	
	
	

}
