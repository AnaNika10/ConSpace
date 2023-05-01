-- Table: public.Conference

-- DROP TABLE IF EXISTS public."Conference";

CREATE TABLE IF NOT EXISTS public."Conference"
(
    "ConferenceId" SERIAL,
    "Name" text COLLATE pg_catalog."default" NOT NULL,
    "Floor" integer NOT NULL,
    "DateTime" timestamp without time zone NOT NULL,
	"Exhibitors" int  NOT NULL,
    "Description" text COLLATE pg_catalog."default",
    "FilesUrls" text[] COLLATE pg_catalog."default",
    CONSTRAINT "Conference_pkey" PRIMARY KEY ("ConferenceId")
)
INSERT INTO public."Conference"(
	"Name", "Floor", "DateTime","Exhibitors" , "Description", "FilesUrls")
	VALUES ('Future of microservices', 1, '2023-04-30 12:44:41.873674', 1,'Matf', ARRAY ['htpp://blabla']);
    
INSERT INTO public."Conference"
    ("Name", "Floor", "DateTime", "Exhibitors" ,"Description", "FilesUrls")
VALUES ('Death', 0, '2023-04-30 12:44:41.873674',2, 'aaaaa',ARRAY ['htpp://aaaa']);

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Conference"
    OWNER to admin;

--select * from "Conference"