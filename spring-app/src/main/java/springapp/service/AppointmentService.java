package springapp.service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import springapp.command.AppointmentCommand;
import springapp.dao.AppointmentDao;
import springapp.domain.Appointment;
import springapp.domain.Client;


@Service
public class AppointmentService {

	@Autowired 
	AppointmentDao appointmentDao;

	private Logger logger = LoggerFactory.getLogger(AppointmentService.class);
	public List<Appointment> getAppointments(){
		return appointmentDao.list();
		
	}
	
	public Map<String,Appointment> getTodayAppointments(){		
		Map<String,Appointment> todaysAppointments = new HashMap<String,Appointment>();			
		List<Appointment> list = appointmentDao.list();
		for(Appointment appointment : list ) {
			if(appointment.getDate().equals(LocalDate.now())) {
				todaysAppointments.put(Integer.toString(appointment.getTime().getHour()), appointment);
			}
		}
		return todaysAppointments;		
	}

	public Appointment getAppointment(int id) {
		return appointmentDao.get(id);
	}
	
	
	public List<LocalTime> geTime(){
		List<LocalTime> defaultTimeList = new ArrayList<>();
		for(String time : appointmentDao.GetDefaultTimeList()) {
			defaultTimeList.add(LocalTime.parse(time,DateTimeFormatter.ISO_TIME));
		}
		return defaultTimeList;
	}
	
	public Map<String,Appointment> getAppointmentForGivenDate(String date) {
		Map<String,Appointment> appointments = new HashMap<String,Appointment>();			
		List<Appointment> list = appointmentDao.list();
		for(Appointment appointment : list ) {
			if(appointment.getDate().toString().equals(date)) {
				appointments.put(Integer.toString(appointment.getTime().getHour()), appointment);
			}
		}
		return appointments;		
	}

	
	public Appointment deleteAppointment(int id) {
		Appointment appointment = getAppointment(id);
		if(appointment != null) {
			appointmentDao.delete(id);
		}
		return null;
	}

	
	public Appointment saveAppointment(AppointmentCommand toSave) {
		Appointment appointment = new Appointment(toSave.getId(), toSave.getTitle(), toSave.getDate(), toSave.getTime(),toSave.getClientId(), toSave.getPetId(), toSave.getNotes());
		return appointmentDao.save(appointment);
	}
	
	public String getTodayDate()
	{
		return LocalDate.now().toString();
	}
	
	public Map<String,String> getPastCurrentFutureDate(String date)
	{
		Map<String,String> dates = new HashMap<String,String>();
		LocalDate localDate = LocalDate.parse(date);
		dates.put("past", localDate.minusDays(1).toString());
		dates.put("current", localDate.toString());
		dates.put("future", localDate.plusDays(1).toString());
		return dates;
	}
	
	public String getFormattedDate(String date)
	{				
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("EEEE, MMM d yyyy");
		LocalDate localDate = LocalDate.parse(date);
		return localDate.format(formatter).toString();
	}
	
	public List<LocalTime> getAvailableTimeForGivenDate(String date,LocalTime selectedTime)
	{		
		List<LocalTime> availableTime = new ArrayList<LocalTime>();
		List<LocalTime> defaultList = geTime();		
		Map<String,Appointment> appointments = getAppointmentForGivenDate(date);
		if(selectedTime != null) {
			availableTime.add(selectedTime);
		}			
		for(LocalTime time : defaultList ) {				
			if(!appointments.containsKey(Integer.toString(time.getHour()))) {
				availableTime.add(time);
			}			
		}		
		return availableTime;		
	}
	
	public boolean IsEnableNewAppointment(String date)
	{	
		Map<String,Appointment> appointments = getAppointmentForGivenDate(date);
		List<LocalTime> defaultList = geTime();
		if(LocalDate.parse(date).isBefore(LocalDate.now()) || appointments.size()== defaultList.size() )
			return false;
		return true;
	}
	
}
