
-- Table: public.Exhibitors

-- DROP TABLE IF EXISTS public."Exhibitors";

CREATE TABLE IF NOT EXISTS public."Exhibitors"
(
         "ExhibitorId" SERIAL PRIMARY KEY ,
         "Name" text NOT NULL,
		 "Stand" int NOT NULL,
         "Description" text
)
INSERT INTO public."Exhibitors"(
	"Name", "Stand", "Description")
	VALUES ('Company1', 123,'desc1');
INSERT INTO public."Exhibitors"(
	"Name", "Stand", "Description")
	VALUES ('Company2', 124,'desc2');
INSERT INTO public."Exhibitors"(
	"Name", "Stand", "Description")
	VALUES ('Company3', 125,'desc3');   


ALTER TABLE IF EXISTS public."Exhibitors"
    OWNER to admin;


select * from "Exhibitors"