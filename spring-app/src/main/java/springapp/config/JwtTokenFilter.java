package springapp.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;
import springapp.service.SecurityService;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JwtTokenFilter extends OncePerRequestFilter {

    @Autowired
    SecurityService securityService;

    /**
     * {@inheritDoc}
     *
     * Configures a filter that checks if the JWT passed in is valid.
     * If so, updates the Security context, otherwise clears out the security context
     *
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");
        String token = null;
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7);
        }

        Authentication authentication = null;
        try{
            authentication = securityService.isValid(token);
        } catch (Exception e){
            logger.info("Failed to get authentication using JWT Token: "+e.getMessage());
        }

        SecurityContextHolder.getContext().setAuthentication(authentication);
        if(authentication != null) {
            filterChain.doFilter(request, response);
        }

    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        AntPathMatcher pathMatcher = new AntPathMatcher();
        if(pathMatcher.match("/api/login", request.getServletPath())){
            return true;
        } else if(pathMatcher.match("/api/**", request.getServletPath())) {
            return false;
        } else {
            return true;
        }
    }
}