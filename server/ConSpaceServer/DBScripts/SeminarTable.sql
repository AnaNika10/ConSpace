-- Table: public.Seminar

-- DROP TABLE IF EXISTS public."Seminar";

CREATE TABLE IF NOT EXISTS public."Seminar"
(
    "SeminarId" SERIAL,
    "Name" text COLLATE pg_catalog."default" NOT NULL,
    "Hall" text NOT NULL,
    "DateTime" timestamp without time zone NOT NULL,
	"Exhibitors" int  NOT NULL,
    "Description" text COLLATE pg_catalog."default",
    "FilesUrls" text[] COLLATE pg_catalog."default",
    CONSTRAINT "Seminar_pkey" PRIMARY KEY ("SeminarId")
)
INSERT INTO public."Seminar"(
	"Name", "Hall", "DateTime","Exhibitors" , "Description", "FilesUrls")
	VALUES ('Future of microservices', 'Arena 1', '2023-04-30 12:44:41.873674', 1,'Matf', ARRAY ['htpp://blabla']);
    
INSERT INTO public."Seminar"
    ("Name", "Hall", "DateTime", "Exhibitors" ,"Description", "FilesUrls")
VALUES ('Death', 'Arena 2', '2023-04-30 12:44:41.873674',2, 'aaaaa',ARRAY ['htpp://aaaa']);

--TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Seminar"
    OWNER to admin;

--select * from "Seminar"