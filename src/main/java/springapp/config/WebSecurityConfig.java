package springapp.config;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import springapp.service.SecurityService;

/**
 * We use this class to configure our security settings
 */
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
   
	@Autowired
	private SecurityService securityService;
	
	@Override 
    protected void configure(HttpSecurity http) throws Exception {
        http
            .authorizeRequests()
                .antMatchers("/css/*","/").permitAll()
                .anyRequest().authenticated()
            .and()
            .formLogin()
                .loginPage("/login")
                .defaultSuccessUrl("/")
                .permitAll()
            .and()
            .logout()
            	.logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
                .permitAll();
    }

	
	/**
	 * Configure the password encoder
	 * @return the password encoder to use when encoding user passwords
	 */
	@Bean
	public PasswordEncoder passwordEncoder() {

		
		// we are using the NoPasswordEncoder because we want the passwords to be in clear 
		// in production applications this would be a very bad idea and we would use something like the BCryptPasswordEncoder.

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
}