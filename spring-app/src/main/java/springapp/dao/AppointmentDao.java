package springapp.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Time;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;
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

import springapp.domain.Appointment;



@Repository
@Scope("singleton")
public class AppointmentDao {
	private Logger logger = LoggerFactory.getLogger(AppointmentDao.class);
	
	
	RowMapper<Appointment> simpleAppointmentMapper = new RowMapper<Appointment>() {		

		@Override
		public Appointment mapRow(ResultSet rs, int rowNum) throws SQLException {						
			return new Appointment(rs.getInt("id"), rs.getString("title"),LocalDate.parse(rs.getString("date")) , LocalTime.parse(rs.getString("time")), rs.getInt("client_id"),rs.getInt("pet_id"),rs.getString("notes"));
		}
	};
	
	RowMapper<String> simpleStringMapper = new RowMapper<String>() {

		@Override
		public String mapRow(ResultSet rs, int rowNum) throws SQLException {
			return rs.getString("time");
		}
	};
	
	 @Autowired
	 JdbcTemplate jdbcTemplate;
	 
	public List<Appointment> list(){
		List<Appointment> queryResult = jdbcTemplate.query(
				"SELECT id, title, date, time,notes,pet_id, client_id FROM appointments",
				simpleAppointmentMapper);
		
		
		return queryResult;
	}
	
	public List<Appointment> listappointmetsforPet(Integer pet_id){
		List<Appointment> queryResult = jdbcTemplate.query(
				"SELECT id, title, date, time,notes,pet_id, client_id FROM appointments WHERE pet_id = ?",
				new Object[] {pet_id},
				simpleAppointmentMapper);
		
		
		return queryResult;
	}
	
	
	public List<Appointment> appointment(Date date){
		List<Appointment> queryResult = jdbcTemplate.query(
				"SELECT id, title, date, time,notes,pet_id, client_id FROM appointments WHERE date = ?",
				new Object[] {date},
				simpleAppointmentMapper);
		
		
		return queryResult;
	}
	
	public Appointment get(int id) {
		List<Appointment> queryResult = jdbcTemplate.query("SELECT id, title, date, time,notes,pet_id, client_id FROM appointments WHERE id = ? LIMIT 1", 
				new Object[] {id},
				simpleAppointmentMapper);
		
		if(queryResult.isEmpty()) {
			return null;
		}
		
		return queryResult.get(0);
		
		
	}
	
	public Appointment save(Appointment appointment) {
		Integer id = appointment.getId();
		if(id == null) {
			
			KeyHolder holder = new GeneratedKeyHolder();

			jdbcTemplate.update(new PreparedStatementCreator() {
				
				@Override
				public PreparedStatement createPreparedStatement(Connection con) throws SQLException {
					PreparedStatement statement = con.prepareStatement("INSERT INTO appointments(title, date, time, client_id, pet_id,notes) VALUES (?, ?, ?, ?, ?, ?)");
					statement.setString(1, appointment.getTitle());
					statement.setString(2, appointment.getDate().toString());
					statement.setString(3, appointment.getTime().toString());					
					statement.setInt(4,appointment.getClientId());
					statement.setInt(5,appointment.getPetId());
					statement.setString(6, appointment.getNotes());
					return statement;

				}
			}, holder);
			
			id = holder.getKey().intValue();
			
		} else {
			jdbcTemplate.update("UPDATE appointments SET title = ?, date = ? , time = ? , notes = ? , client_id = ? ,pet_id = ?  WHERE id = ?",
					new Object[] {appointment.getTitle(), appointment.getDate().toString(), appointment.getTime().toString(), appointment.getNotes(), appointment.getClientId() , appointment.getPetId() , id});
		}
		
		return get(id);
	}
	
	public void delete(int id) {
		
		jdbcTemplate.update("DELETE FROM appointments WHERE id = ?",
				new Object[] {id});
		
	}
	
	public List<String> GetDefaultTimeList() {
		List<String> queryResult = jdbcTemplate.query(
				"SELECT time FROM AppointmentTime",
				simpleStringMapper);
		
		
		return queryResult;
	}
}
