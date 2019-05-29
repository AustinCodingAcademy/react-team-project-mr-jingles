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
	client_id integer,
	FOREIGN KEY (client_id) REFERENCES clients(id)

);


create table users (
	id integer PRIMARY KEY AUTOINCREMENT,
	username varchar(255),
	encoded_password varchar(255),
	role varchar(255)
);

CREATE TABLE appointments (
id INTEGER PRIMARY KEY AUTOINCREMENT,
title NVARCHAR(255),
date DATE,
time TIME,
notes NVARCHAR(600),
client_id integer,
pet_id integer, 
FOREIGN KEY (client_id) REFERENCES clients(id)
FOREIGN KEY (pet_id) REFERENCES pets(id)
);

insert into users values (null, 'admin', 'password', 'SUPER_ADMIN');
