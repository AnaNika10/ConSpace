   
-- Table: public.Conference_Speakers

-- DROP TABLE IF EXISTS public."Conference_Speakers";

CREATE TABLE IF NOT EXISTS public."Conference_Speakers"
(
    "ConferenceId" INT NOT NULL,
    "SpeakerId" INT NOT NULL,
    constraint pk_conference_speaker primary key ("ConferenceId", "SpeakerId"),
      CONSTRAINT fk_conference
      FOREIGN KEY("ConferenceId") 
	  REFERENCES public."Conference"("ConferenceId")
	  ON DELETE CASCADE,
      CONSTRAINT fk_speakers
      FOREIGN KEY("SpeakerId") 
	  REFERENCES public."Speakers"("SpeakerId")
	  ON DELETE CASCADE

)
INSERT INTO public."Conference_Speakers"(
	"ConferenceId","SpeakerId")
	VALUES (1,1);
    
INSERT INTO public."Conference_Speakers"(
	"ConferenceId","SpeakerId")
	VALUES (1,2);
TABLESPACE pg_default;



ALTER TABLE IF EXISTS public."Conference_Speakers"
    OWNER to admin;

select * from "Conference_Speakers" 