package springapp.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import springapp.domain.Gender;
import springapp.domain.Pet;

@Repository
@Scope("singleton")
public class PetDao {
	private Logger logger = LoggerFactory.getLogger(PetDao.class);

	RowMapper<Pet> simplePetMapper = new RowMapper<Pet>() {

		@Override
		public Pet mapRow(ResultSet rs, int rowNum) throws SQLException {
			String genderString = rs.getString("gender");
			Gender gender = null;
			if(genderString!= null) {
				gender = Gender.valueOf(genderString);

			}
			return new Pet(rs.getInt("id"), rs.getString("name"), gender, rs.getBoolean("altered"), rs.getInt("client_id"));
		}
	};
	
	
    @Autowired
    JdbcTemplate jdbcTemplate;
    	
	public List<Pet> list(){
		List<Pet> queryResult = jdbcTemplate.query(
				"SELECT id, name, gender, altered, client_id FROM pets",
				simplePetMapper);
		
		
		return queryResult;
	}
	
	public List<Pet> listForClient(int clientId){
		List<Pet> queryResult = jdbcTemplate.query(
				"SELECT id, name, gender, altered, client_id FROM pets WHERE client_id = ?",
				new Object[] {clientId},
				simplePetMapper);
		
		
		return queryResult;
	}
	
	public Pet get(int id) {
		List<Pet> queryResult = jdbcTemplate.query(
				"SELECT id, name, gender, altered, client_id FROM pets WHERE id = ? LIMIT 1", 
				new Object[] {id},
				simplePetMapper);
		
		if(queryResult.isEmpty()) {
			return null;
		}
		
		return queryResult.get(0);
		
		
	}
	
	public Pet save(Pet pet) {
		Integer id = pet.getId();
		if(id == null) {
			
			KeyHolder holder = new GeneratedKeyHolder();

			jdbcTemplate.update(new PreparedStatementCreator() {
				
				@Override
				public PreparedStatement createPreparedStatement(Connection con) throws SQLException {
					PreparedStatement statement = con.prepareStatement("INSERT INTO pets(name, gender, altered, client_id) VALUES (?, ?, ?, ?)");
					statement.setString(1, pet.getName());
					statement.setObject(2, pet.getGender());
					statement.setBoolean(3, pet.isAltered());
					statement.setInt(4, pet.getClientId());
					return statement;

				}
			}, holder);
			
			id = holder.getKey().intValue();
			
		} else {
			// notice that we do not update the client id since we do not want to enable pet transfer from this method
			jdbcTemplate.update("UPDATE pets SET name = ?, gender = ? , altered = ?  WHERE id = ?",
					new Object[] {pet.getName(), pet.getGender(), pet.isAltered(), id});
		}
		
		return get(id);
	}
	
	public void delete(int id) {
		
		jdbcTemplate.update("DELETE FROM pets WHERE id = ?",
				new Object[] {id});
		
	}
}
