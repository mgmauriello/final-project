set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."soundscapes" (
	"soundscapeId" serial NOT NULL,
	"fileUrl" TEXT NOT NULL,
	"uploadedAt" timestamp with time zone NOT NULL,
	"lat" FLOAT NOT NULL,
	"lng" FLOAT NOT NULL,
  "description" TEXT,
	"title" TEXT,
	CONSTRAINT "soundscapes_pk" PRIMARY KEY ("soundscapeId")
) WITH (
  OIDS=FALSE
);
