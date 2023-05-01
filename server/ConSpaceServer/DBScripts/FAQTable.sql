
-- Table: public.FAQ

-- DROP TABLE IF EXISTS public."FAQ";

CREATE TABLE IF NOT EXISTS public."FAQ"
(
         "QuestionId" SERIAL PRIMARY KEY ,
         "Question" text NOT NULL,
		 "Answer" text NOT NULL
)
INSERT INTO public."FAQ"(
	"Question", "Answer")
	VALUES ('Qustion1?', 'Answer1');
INSERT INTO public."FAQ"(
	"Question", "Answer")
	VALUES ('Qustion2?', 'Answer2');
INSERT INTO public."FAQ"(
	"Question", "Answer")
	VALUES ('Qustion3?', 'Answer3');  


ALTER TABLE IF EXISTS public."FAQ"
    OWNER to admin;


select * from "FAQ"