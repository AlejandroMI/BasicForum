sqlite3 bdpf1;
create table usuario(nombre varchar(20) primary key NOT NULL, password varchar(20) NOT NULL);

create table mensajito(	nombre varchar(20) NOT NULL, 
			instante integer NOT NULL, 
			texto varchar(140),
			primary key(instante),
			foreign key(nombre) references usuario(nombre));


insert into usuario values('Alejandro', '12345');
insert into usuario values('Rodrigo', '123456');
insert into usuario values('Clara', '1234567');

