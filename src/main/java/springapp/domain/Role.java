package springapp.domain;

import static springapp.domain.Permission.LIST_CLIENTS;
import static springapp.domain.Permission.LIST_PETS;

import java.util.ArrayList;
import java.util.List;


public enum Role {

	SUPER_ADMIN(Permission.values()),
	READ_ONLY(LIST_PETS, LIST_CLIENTS);
	
	
	private final Permission[] permissions;
	
	Role(Permission ... permissions) {
		this.permissions = permissions;
	}
	
	public List<Permission> getPermissions(){
		List<Permission> list = new ArrayList<>();
		for(Permission p: permissions) {
			list.add(p);
		}
		return list;
	}
	
}
