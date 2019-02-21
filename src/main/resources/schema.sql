create table clients (
	id integer PRIMARY KEY AUTOINCREMENT,
	name varchar(255),
	phone_number varchar(255),
	address varchar(255)
);

create table pets (
	id integer PRIMARY KEY AUTOINCREMENT,
	name varchar(255),
	gender varchar(255),
	altered boolean,
	client_id id,
	FOREIGN KEY (client_id) REFERENCES client(id)
	
);