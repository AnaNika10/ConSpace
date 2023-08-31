CREATE TABLE IF NOT EXISTS public."Seminar"
(
    "SeminarId" UUID DEFAULT gen_random_uuid(),
    "Name" text COLLATE pg_catalog."default" NOT NULL,
    "Hall" text NOT NULL,
    "StartDateTime" timestamp without time zone NOT NULL,
    "EndDateTime" timestamp without time zone NOT NULL,
    "Exhibitors" int,
    "Description" text COLLATE pg_catalog."default",
    "FilesUrls" text[] COLLATE pg_catalog."default",
    CONSTRAINT "Seminar_pkey" PRIMARY KEY ("SeminarId")
);
CREATE TABLE IF NOT EXISTS public."Speakers"
(
         "SpeakerId" SERIAL PRIMARY KEY ,
         "Name" text NOT NULL,
	     "Email" text NOT NULL,
		 "Position" text NOT NULL,
         "Company" text NOT NULL,
         "BioInfo" text
);
CREATE TABLE IF NOT EXISTS public."Exhibitors"
(
         "ExhibitorId" SERIAL PRIMARY KEY ,
         "Name" text NOT NULL,
		 "Stand" int NOT NULL,
         "Description" text
);

CREATE TABLE IF NOT EXISTS public."FAQ"
(
         "QuestionId" SERIAL PRIMARY KEY ,
         "Question" text NOT NULL,
         "Answer" text NOT NULL
);
ALTER TABLE "Seminar"
ADD CONSTRAINT  "constraint_fk_sem_ex"
FOREIGN KEY ("Exhibitors")
REFERENCES "Exhibitors"("ExhibitorId")
ON DELETE SET NULL;
TRUNCATE TABLE "Speakers"   RESTART IDENTITY  CASCADE;
TRUNCATE TABLE "Exhibitors"   RESTART IDENTITY  CASCADE;
TRUNCATE TABLE "FAQ"   RESTART IDENTITY  CASCADE;
INSERT INTO public."Speakers"(
	"Name", "Position","Company", "Email","BioInfo")
	VALUES ('Ana Nikacevic','Full stack','Company', 'ana@gmail.com','Short description for Ana Nikacevic');
INSERT INTO public."Speakers"(
   "Name", "Position","Company", "Email","BioInfo")
	VALUES ('Marija Lakic','Back end','Company1', 'marija@gmail.com','Short description for Marija Lakic');
INSERT INTO public."Speakers"(
    "Name", "Position","Company","Email", "BioInfo")
	VALUES ('Milica Radojicic','Data anylist','Company1', 'milica@gmail.com','Short description for Milica Radojicic'); 
INSERT INTO public."Speakers"(
    "Name", "Position","Company","Email", "BioInfo")
	VALUES ('John Doe','Project manager','Company1', 'john@gmail.com','Short description for John Doe'); 
INSERT INTO public."Speakers"(
    "Name", "Position","Company","Email", "BioInfo")
	VALUES ('Jane Doe','Team lead','Company', 'jane@gmail.com','Short description for Jane Doe'); 

INSERT INTO public."Exhibitors"(
	"Name", "Stand", "Description")
	VALUES ('Google', 155,'Description for Google');
INSERT INTO public."Exhibitors"(
	"Name", "Stand", "Description")
	VALUES ('Microsoft', 100,'Description for Microsoft');
INSERT INTO public."Exhibitors"(
	"Name", "Stand", "Description")
	VALUES ('Cisco', 161,'Description for Cisco'); 
INSERT INTO public."Exhibitors"(
	"Name", "Stand", "Description")
	VALUES ('Apple', 143,'Description for Apple');
INSERT INTO public."Exhibitors"(
	"Name", "Stand", "Description")
	VALUES ('Amazon', 180,'Description for Amazon');
INSERT INTO public."Exhibitors"(
	"Name", "Stand", "Description")
	VALUES ('Meta', 125,'Description for Meta'); 
INSERT INTO public."Exhibitors"(
	"Name", "Stand", "Description")
	VALUES ('Company', 123,'Description for Company');
INSERT INTO public."Exhibitors"(
	"Name", "Stand", "Description")
	VALUES ('Company1', 124,'Description for Company1');
INSERT INTO public."Exhibitors"(
	"Name", "Stand", "Description")
	VALUES ('Tencent', 137,'Description for Tencent'); 


INSERT INTO public."Seminar"(
	"Name", "Hall", "StartDateTime","EndDateTime","Exhibitors" , "Description", "FilesUrls")
VALUES ('Future of microservices', 'Arena 1', '2023-08-27T10:30:41','2023-08-27T14:30:41', 1,'Description for this seminar', ARRAY ['htpp://blabla']);
    
INSERT INTO public."Seminar"(
	"Name", "Hall", "StartDateTime","EndDateTime","Exhibitors" , "Description", "FilesUrls")
VALUES ('Git for beginners', 'Arena 2', '2023-08-27T15:00:41','2023-08-27T16:30:41',6, 'Description for this seminar',ARRAY ['htpp://aaaa']);

INSERT INTO public."Seminar"(
	"Name", "Hall", "StartDateTime","EndDateTime","Exhibitors" , "Description", "FilesUrls")
VALUES ('Wireless Mesh Networks', 'Arena 3', '2023-08-28T09:30:41','2023-08-28T11:30:41',null, 'Description for this seminar',ARRAY ['htpp://aaaa']);

INSERT INTO public."Seminar"(
	"Name", "Hall", "StartDateTime","EndDateTime","Exhibitors" , "Description", "FilesUrls")
VALUES ('Optical Data Security', 'Arena 4', '2023-08-28T14:30:41','2023-08-28T16:30:41',4, 'Description for this seminar',ARRAY ['htpp://aaaa']);

INSERT INTO public."Seminar"(
	"Name", "Hall", "StartDateTime","EndDateTime","Exhibitors" , "Description", "FilesUrls")
VALUES ('Design patterns', 'Arena 1', '2023-08-29T12:30:41','2023-08-29T14:30:41',4, 'Description for this seminar',ARRAY ['htpp://aaaa']);

INSERT INTO public."Seminar"(
	"Name", "Hall", "StartDateTime","EndDateTime","Exhibitors" , "Description", "FilesUrls")
VALUES ('Future of microservices - intermediate', 'Arena 2', '2023-08-29T15:30:41','2023-08-29T18:30:41',5, 'Description for this seminar',ARRAY ['htpp://aaaa']);

INSERT INTO public."Seminar"(
	"Name", "Hall", "StartDateTime","EndDateTime","Exhibitors" , "Description", "FilesUrls")
VALUES ('Introduction to AI', 'Arena 3', '2023-08-30T12:00:41','2023-08-30T16:00:41',3, 'Description for this seminar',ARRAY ['htpp://aaaa']);

	






INSERT INTO public."FAQ"(
	"Question", "Answer")
	VALUES ('Can I take notes?', 'Yes, in the notes section you write and later edit your notes.');
INSERT INTO public."FAQ"(
	"Question", "Answer")
	VALUES ('How do I contact my favourite speaker?', 'Simple, just invite him and suggest a meeting time and place');
INSERT INTO public."FAQ"(
	"Question", "Answer")
	VALUES ('Will I be charged for this service at the conference?', 'No, our goal is to bring together all curious learners of the world!'); 


CREATE TABLE IF NOT EXISTS public."Seminar_Speakers"
(
    "SeminarId" UUID NOT NULL,
    "SpeakerId" INT NOT NULL,
    constraint pk_seminar_speaker primary key ("SeminarId", "SpeakerId"),
      CONSTRAINT fk_seminar
      FOREIGN KEY("SeminarId") 
	  REFERENCES public."Seminar"("SeminarId")
	  ON DELETE CASCADE,
      CONSTRAINT fk_speakers
      FOREIGN KEY("SpeakerId") 
	  REFERENCES public."Speakers"("SpeakerId")
	  ON DELETE CASCADE

);



INSERT INTO "Seminar_Speakers"
SELECT
     "SeminarId",
     CASE
           WHEN "Exhibitors" = 1
                THEN 1
            WHEN "Exhibitors" = 2
                THEN 3
           WHEN "Exhibitors" = 6 
                THEN 3
           WHEN "Exhibitors" =  4 
                THEN 2
           WHEN "Exhibitors" = 5
                THEN 5
	    ELSE 
		2
       END "SpeakerId" FROM  "Seminar";