CREATE TABLE IF NOT EXISTS public."Seminar"
(
    "SeminarId" UUID DEFAULT gen_random_uuid(),
    "Name" text COLLATE pg_catalog."default" NOT NULL,
    "Hall" text NOT NULL UNIQUE,
    "StartDateTime" timestamp without time zone NOT NULL,
    "EndDateTime" timestamp without time zone NOT NULL,
	"Exhibitors" int  NOT NULL,
    "Description" text COLLATE pg_catalog."default",
    "FilesUrls" text[] COLLATE pg_catalog."default",
    CONSTRAINT "Seminar_pkey" PRIMARY KEY ("SeminarId")
);

INSERT INTO public."Seminar"(
	"Name", "Hall", "StartDateTime","EndDateTime","Exhibitors" , "Description", "FilesUrls")
	VALUES ('Future of microservices', 'Arena 1', '2023-04-30 12:44:41.873674','2023-04-30 13:44:41.873674', 1,'Matf', ARRAY ['htpp://blabla']);
    
INSERT INTO public."Seminar"(
	"Name", "Hall", "StartDateTime","EndDateTime","Exhibitors" , "Description", "FilesUrls")
VALUES ('Death', 'Arena 2', '2023-04-30 12:44:41.873674','2023-04-30 14:44:41.873674',2, 'aaaaa',ARRAY ['htpp://aaaa']);


CREATE TABLE IF NOT EXISTS public."Speakers"
(
         "SpeakerId" SERIAL PRIMARY KEY ,
         "Name" text NOT NULL,
		 "Position" text NOT NULL,
         "Company" text NOT NULL,
         "BioInfo" text
);
INSERT INTO public."Speakers"(
	"Name", "Position","Company", "BioInfo")
	VALUES ('Ana Nikacevic','FS','a1', 'bla1');
INSERT INTO public."Speakers"(
   "Name", "Position","Company", "BioInfo")
	VALUES ('Marija Lakic','BE','a2', 'bla2');
INSERT INTO public."Speakers"(
    "Name", "Position","Company", "BioInfo")
	VALUES ('Milica Radojicic','DA','a3', 'bla3'); 


CREATE TABLE IF NOT EXISTS public."Exhibitors"
(
         "ExhibitorId" SERIAL PRIMARY KEY ,
         "Name" text NOT NULL,
		 "Stand" int NOT NULL,
         "Description" text
);
INSERT INTO public."Exhibitors"(
	"Name", "Stand", "Description")
	VALUES ('Company1', 123,'desc1');
INSERT INTO public."Exhibitors"(
	"Name", "Stand", "Description")
	VALUES ('Company2', 124,'desc2');
INSERT INTO public."Exhibitors"(
	"Name", "Stand", "Description")
	VALUES ('Company3', 125,'desc3'); 

CREATE TABLE IF NOT EXISTS public."FAQ"
(
         "QuestionId" SERIAL PRIMARY KEY ,
         "Question" text NOT NULL,
		 "Answer" text NOT NULL
);
INSERT INTO public."FAQ"(
	"Question", "Answer")
	VALUES ('Qustion1?', 'Answer1');
INSERT INTO public."FAQ"(
	"Question", "Answer")
	VALUES ('Qustion2?', 'Answer2');
INSERT INTO public."FAQ"(
	"Question", "Answer")
	VALUES ('Qustion3?', 'Answer3');  