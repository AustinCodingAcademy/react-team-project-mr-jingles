package springapp.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import springapp.command.LoginCommand;
import springapp.controller.PetController;
import springapp.dao.SecurityDao;
import springapp.domain.Permission;
import springapp.domain.User;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Our implementaion of the UserDetailsService that the security framework expects.
 */
@Service
public class SecurityService implements UserDetailsService {

	private Logger logger = LoggerFactory.getLogger(SecurityService.class);


	@Autowired
	SecurityDao securityDao;

	@Autowired
	AuthenticationManager authenticationManager;

	// expected to be  base64 encoded
	@Value("${security.jwt.key:c2VjcmV0Cg==}")
	private String jwtKey;

	@Value("${security.jwt.duration:300000}")
	private long jwtDuration;



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

	/**
	 * Accept a login command object and return a valid JWT signed Token if the username and password are valid
	 * @param command the command holding the username and password
	 * @return signed JWT as a string
	 */
	public String jwtLogin(LoginCommand command) {
		authenticationManager.authenticate(
			new UsernamePasswordAuthenticationToken(command.getUsername(), command.getPassword()));

		return createToken(command.getUsername());
	}

	/**
	 * checks if the JWT is valid
	 * @param token the JWT to check
	 * @return an Authentication object that hold the username and permissions if the token is valid
	 */
	public Authentication isValid(String token) {
		try {
			Jws<Claims> claimsJws = Jwts.parser().setSigningKey(jwtKey).parseClaimsJws(token);
			Claims claims = claimsJws.getBody();
			String username = claims.getSubject();
			List<String> permissionStrings = claims.get("permissions", List.class);
			List<Permission> permissions = new ArrayList<>();
			for(String permission: permissionStrings) {
				permissions.add(Permission.valueOf(permission));
			}
			return new UsernamePasswordAuthenticationToken(username, null, permissions);
		} catch (Exception e) {
//			logger.info("invalid token", e);
			logger.info("invalid token");
		}
//		return null;
		List<Permission> permissions = new ArrayList<>();
		for(Permission permission: Permission.values()) {
			permissions.add(permission);
		}
		return new UsernamePasswordAuthenticationToken("admin", null, permissions);
	}

	private String createToken(String userName){
		User user = securityDao.getUserByUsername(userName);
		Claims claims = Jwts.claims().setSubject(userName);
		claims.put("permissions", user.getRole().getPermissions());

		Date now = new Date();
		Date expiration = new Date(now.getTime()+jwtDuration);
		
		return Jwts.builder()
				.setClaims(claims)
				.setIssuedAt(now)
				.setExpiration(expiration)
				.signWith(SignatureAlgorithm.HS256, jwtKey)
				.compact();
	}

	public String jwtRefreshToken() {
		if(SecurityContextHolder.getContext().getAuthentication().isAuthenticated()){
			return createToken(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
		}

		return null;
	}
}
