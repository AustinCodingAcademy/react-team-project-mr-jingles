package springapp.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import springapp.domain.Role;
import springapp.domain.User;

@Repository
@Scope("singleton")
public class SecurityDao {
	private Logger logger = LoggerFactory.getLogger(SecurityDao.class);

	RowMapper<User> simpleUserMapper = new RowMapper<User>() {

		@Override
		public User mapRow(ResultSet rs, int rowNum) throws SQLException {
			String roleString = rs.getString("role");
			Role role = Role.valueOf(roleString);
			return new User(rs.getInt("id"), rs.getString("username"), rs.getString("encoded_password"), role);
		}
	};
	
    @Autowired
    JdbcTemplate jdbcTemplate;    	
	public User getUserByUsername(String username) {
		logger.debug("in getUserByUsername({})", username);
		List<User> queryResult = jdbcTemplate.query("SELECT id, username, encoded_password, role FROM users WHERE username = ?", 
				new Object[] {username},
				simpleUserMapper);
		
		if(queryResult.isEmpty()) {
			return null;
		}
		
		if(queryResult.size() > 1) {
			throw new IllegalStateException("Found more than one user matching the username "+username);
		}
		
		return queryResult.get(0);
		
		
	}

	
	
}
