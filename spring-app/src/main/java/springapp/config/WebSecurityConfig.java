package springapp.config;


import java.util.Arrays;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import springapp.service.SecurityService;

/**
 * We use this class to configure our security settings
 */
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter{
   
	@Autowired
	private SecurityService securityService;

	@Configuration
	@Order(1)
	public static class ApiSecurityConfig extends WebSecurityConfigurerAdapter {

		@Autowired
		JwtTokenFilter jwtTokenFilter;

		@Override
		public void configure(HttpSecurity http) throws Exception {
			http.cors().and()
				.antMatcher("/api/**")
                    .authorizeRequests()
                    .antMatchers("/api/login").permitAll()
					.anyRequest().authenticated()
				.and()
					.csrf().disable()
				.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
				.and()
				.addFilterBefore(jwtTokenFilter, UsernamePasswordAuthenticationFilter.class)

            ;

		}
		
	    @Bean
	    public CorsConfigurationSource corsConfigurationSource() {
	        CorsConfiguration configuration = new CorsConfiguration();
	        configuration.setAllowedOrigins(Arrays.asList("*"));
	        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
	        configuration.setAllowedHeaders(Arrays.asList("authorization", "content-type", "x-auth-token"));
	        configuration.setExposedHeaders(Arrays.asList("x-auth-token"));
	        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
	        source.registerCorsConfiguration("/**", configuration);
	        return source;
	    }
	}

	@Configuration
	@Order(2)
	public static class FormLoginSecurityConfig extends WebSecurityConfigurerAdapter {
		/**
		 * This method configures the general http security settings
		 *
		 * {@inheritDoc}
		 */
		@Override
		protected void configure(HttpSecurity http) throws Exception {
			http
				.authorizeRequests()
					// allow pages under the css folder and home page to be accessible to every on
					.antMatchers("/css/*","/").permitAll()
					// but all other pages should only be accessible for logged in users
					.anyRequest().authenticated()
				.and()
				.csrf()
					.ignoringAntMatchers("/api/*")
				.and()
				// we configure the form login page below
				.formLogin()
					.loginPage("/login") // we specify what the login url should be
					.defaultSuccessUrl("/") // and the default page to go to after a user logs in
					.permitAll() // all users are allowed to access the login page
				.and()
				 // below we configure the logout mechanism
				.logout()
					// this is the url that will trigger the logout mechanism in the security frame work
					.logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
					.permitAll(); // all users are allowed to logout
		}
	}


	/**
	 * Configure the password encoder
	 * @return the password encoder to use when encoding user passwords
	 */
	@Bean
	public PasswordEncoder passwordEncoder() {

		
		// we are using the NoPasswordEncoder because we want the passwords to be in clear 
		// in production applications this would be a very bad idea
        // and we would use something like the BCryptPasswordEncoder.
        // Using the BcryptPasswordEncoder, will hash the password the user types in,
        // and compare the hash against what the security service returns
        // plain text passwords and encrypted passwords should not be stored in the database.
        // You should only store a non-revirsable hash of the password.

		return NoOpPasswordEncoder.getInstance();
		//return new BCryptPasswordEncoder();

	}
	
    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
    	DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
    	authProvider.setUserDetailsService(securityService);
    	authProvider.setPasswordEncoder(passwordEncoder());
    	return authProvider;
    }

    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
}