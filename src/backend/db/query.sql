CREATE table IF NOT EXISTS users(
	id serial,
	firstName varchar(50) not null,
	lastName varchar(50) not null,
	email varchar(150) not null UNIQUE,
	passwordHash varchar(150) not null,
	createdAt BIGINT not null,
	verified BOOLEAN not null DEFAULT false,
	blocked BOOLEAN not null DEFAULT false,
	paymentType int not null DEFAULT 1,
	PRIMARY KEY(id)
);

CREATE index idx_users on users (
	id ASC, 
	email
);

INSERT into users (firstname, firstName, lastName, email, passwordhash, createdat, paymenttype) 
VALUE('', '', '', '', 11, 1);