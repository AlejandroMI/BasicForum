
sqlite3 pruebas.bd
create table Persona(dni char(9) primary key, nombre varchar(20));
create table Matricula(dni char(9) foreign key, cod char(3) foreign key);
create table Asignatura(cod char(3) primary key, nombre varchar(20));
insert into Persona values('77842996W', 'Alejandro');
insert into Persona values('77842995R', 'Rodrigo');
insert into Matricula values('77842996W', '101');
insert into Matricula values('77842996W', '102');
insert into Matricula values('77842995R', '102');
insert into Asignatura values('101', 'Matemáticas');
insert into Asignatura values('102', 'Física');

