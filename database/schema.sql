set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "users" (
	"userID" serial NOT NULL,
	"username" TEXT NOT NULL,
	"email" TEXT NOT NULL UNIQUE,
	"hashedPassword" TEXT NOT NULL,
	-- "createdAt" DATETIME NOT NULL default now(),
	CONSTRAINT "users_pk" PRIMARY KEY ("userID")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "games" (
	"gameName" TEXT NOT NULL default 'New Game',
	"gameID" serial NOT NULL,
	"userID" integer NOT NULL,
	-- "createdAt" DATETIME NOT NULL default now(),
	CONSTRAINT "games_pk" PRIMARY KEY ("gameID")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "lists" (
	"listName" TEXT NOT NULL default 'New List',
	"listID" serial NOT NULL,
	"userID" integer NOT NULL,
	-- "createdAt" DATETIME NOT NULL default now(),
	CONSTRAINT "lists_pk" PRIMARY KEY ("listID")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "gamelist" (
	"gameID" integer NOT NULL,
	"listID" integer NOT NULL,
	CONSTRAINT "gameList_pk" PRIMARY KEY ("gameID","listID")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "listwords" (
	"listWordID" serial NOT NULL,
	"listID" integer NOT NULL,
	"word" TEXT NOT NULL default 'New Word',
	CONSTRAINT "listWords_pk" PRIMARY KEY ("listWordID")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "games" ADD CONSTRAINT "games_fk0" FOREIGN KEY ("userID") REFERENCES "users"("userID");

ALTER TABLE "lists" ADD CONSTRAINT "lists_fk0" FOREIGN KEY ("userID") REFERENCES "users"("userID");

ALTER TABLE "gamelist" ADD CONSTRAINT "gamelist_fk0" FOREIGN KEY ("gameID") REFERENCES "games"("gameID") ON DELETE CASCADE;
ALTER TABLE "gamelist" ADD CONSTRAINT "gamelist_fk1" FOREIGN KEY ("listID") REFERENCES "lists"("listID") ON DELETE CASCADE;

ALTER TABLE "listwords" ADD CONSTRAINT "listwords_fk0" FOREIGN KEY ("listID") REFERENCES "lists"("listID");
