   
-- Table: public.Seminar_Speakers

-- DROP TABLE IF EXISTS public."Seminar_Speakers";


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

)
INSERT INTO public."Seminar_Speakers"(
	"SeminarId","SpeakerId")
	VALUES ('58925ce3-1111-4efc-b459-a93552fe1dc2',1);
    
INSERT INTO public."Seminar_Speakers"(
	"SeminarId","SpeakerId")
	VALUES ('c9b971b3-2074-43b8-ad62-712da51d01c6',2);
TABLESPACE pg_default;



ALTER TABLE IF EXISTS public."Seminar_Speakers"
    OWNER to admin;

-- select * from "Seminar_Speakers" 