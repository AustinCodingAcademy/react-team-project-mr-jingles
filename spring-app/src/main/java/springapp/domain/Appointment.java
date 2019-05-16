package springapp.domain;

import java.sql.Date;
import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalTime;

import org.springframework.format.annotation.DateTimeFormat;


public class Appointment {	
	private final Integer id;
	private final String title;
	@DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
	private final LocalDate date;
	private final LocalTime time;
	private final String notes;
	private final Integer petId;
	private final Integer clientId;
	
	public Appointment(Integer id, String title, LocalDate date, LocalTime time, Integer clientId, Integer petId, String notes) {
		this.id = id;
		this.title = title;
		this.date = date;
		this.time = time;		
		this.petId = petId;
		this.clientId = clientId;
		this.notes = notes;
	}

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
