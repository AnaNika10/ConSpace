   
 --Table: public.Speakers

-- DROP TABLE IF EXISTS public."Speakers";

CREATE TABLE IF NOT EXISTS public."Speakers"
(
         "SpeakerId" SERIAL PRIMARY KEY ,
         "Name" text NOT NULL,
		 "Position" text NOT NULL,
         "Company" text NOT NULL,
         "BioInfo" text
)
INSERT INTO public."Speakers"(
	"Name", "Position","Company", "BioInfo")
	VALUES ('Ana Nikacevic','FS','a1', 'bla1');
INSERT INTO public."Speakers"(
   "Name", "Position","Company", "BioInfo")
	VALUES ('Marija Lakic','BE','a2', 'bla2');
INSERT INTO public."Speakers"(
    "Name", "Position","Company", "BioInfo")
	VALUES ('Milica Radojicic','DA','a3', 'bla3');    


ALTER TABLE IF EXISTS public."Speakers"
    OWNER to admin;


select * from "Speakers"