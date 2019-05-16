package springapp.command;

import java.sql.Date;
import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalTime;

import org.slf4j.LoggerFactory;
import org.springframework.format.annotation.DateTimeFormat;


import org.slf4j.Logger;

import springapp.controller.AppointmentRestController;
import springapp.domain.Appointment;

/**
 * This command class is used to pass information back and force between the appointment and the server
 * 
 */
public class AppointmentCommand {
	
	private Integer id;
	private String notes;
	private String title;
	@DateTimeFormat(iso = DateTimeFormat.ISO.TIME)
	private LocalTime time;
	@DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
	private LocalDate date;
	private Integer petId;
	private Integer clientId;
	
	private Logger logger = LoggerFactory.getLogger(AppointmentCommand.class);

	/**
	 * Creates a command object that has the initial values the same as the Appointment passed in
	 * @param Appointment the Appointment to initialize the command object with
	 */
	
	public AppointmentCommand () {
		
	}
	
	public AppointmentCommand(Appointment appointment) {
		if(appointment != null) {					
			this.clientId= appointment.getClientId();			
			this.petId= appointment.getPetId();
			this.id = appointment.getId();
			this.title= appointment.getTitle();
			this.notes = appointment.getNotes();
			this.time = appointment.getTime();
			this.date = appointment.getDate();				
		}
	}

	/**
	 * Set the id of the appointment
	 * @param id the appointment id, null if this appointment is not persisted to the database (ie a new appointment)
	 */
	public void setId(Integer id) {
		this.id = id;
	}
	
	/**
	 * Set the name of the appointment
	 * @param name the name of the appointment
	 */
	public void setTitle(String title) {
		this.title = title;
	}

	/**
	 * Set the name of the appointment
	 * @param name the name of the appointment
	 */
	public void setNotes(String notes) {
		this.notes = notes;
	}
	
	/**
	 * Set the name of the appointment
	 * @param name the name of the appointment
	 */
	public void setpetId(Integer petId) {
		this.petId = petId;
	}
	

	/**
	 * Set the name of the appointment
	 * @param name the name of the appointment
	 */
	public void setclientId(Integer clientId) {
		this.clientId = clientId;
	}


	/**
	 * Set the time of the appointment
	 * @param time the appointment address
	 */
	public void setTime(LocalTime time) {
		this.time = time;
	}

	/**
	 * Set the date of the appointment
	 * @param date of appointment
	 */
	public void setDate(LocalDate date) {
		this.date = date;
	}

	/**
	 * @return the appointment id, returns null if this appointment is new and not persisted to the database yet
	 */
	
	public Integer getId() {
		return id;
	}

	public String getTitle() {
		return title;
	}

	public LocalDate getDate() {
		return date;
	}

	public LocalTime getTime() {
		return time;
	}

	public String getNotes() {
		return notes;
	}

	public Integer getPetId() {
		return petId;
	}

	public Integer getClientId() {
		return clientId;
	}
	
  
}
