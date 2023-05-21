   
-- Table: public.Seminar_Speakers

-- DROP TABLE IF EXISTS public."Seminar_Speakers";

CREATE TABLE IF NOT EXISTS public."Seminar_Speakers"
(
    "SeminarId" INT NOT NULL,
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
	"SpeakerId","SpeakerId")
	VALUES (1,1);
    
INSERT INTO public."Seminar_Speakers"(
	"SpeakerId","SpeakerId")
	VALUES (1,2);
TABLESPACE pg_default;



ALTER TABLE IF EXISTS public."Seminar_Speakers"
    OWNER to admin;

select * from "Seminar_Speakers" 