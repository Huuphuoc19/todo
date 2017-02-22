-- Todo App Assignment

-- categories table
create table categories
(
	id int not null auto_increment primary key,
	title varchar(100) not null,
	description text null,
	created_at datetime not null default current_timestamp
);

-- states
create table states
(
	id int not null auto_increment primary key,
	state varchar(50) not null
);
-- default 
insert into `states` values
	(1,'todo'),
	(2,'completed');

-- tasks
create table tasks 
(
	id int not null auto_increment primary key,
	title varchar(50) not null,
	description text null,
	created_at datetime not null default current_timestamp,
	cat_id int not null,
	state_id int not null
);

-- pk
alter table tasks add 
	constraint FK_tasks_categories foreign key (cat_id) references categories(id);
alter table tasks add 
	constraint FK_tasks_states foreign key (state_id) references states(id);

-- index fk 
create index INDEX_tasks_categories ON tasks (cat_id);
create index INDEX_tasks_states ON tasks (state_id);

