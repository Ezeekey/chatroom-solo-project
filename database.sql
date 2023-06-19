
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "privilege" INT NOT NULL,
    "status" VARCHAR(150)
);

CREATE TABLE "chatroom" (
    "id" SERIAL PRIMARY KEY,
    "room_name" VARCHAR(100) NOT NULL,
    "type" VARCHAR(25) NOT NULL,
    "participant_limit" INT DEFAULT 8 NOT NULL,
    "creator_id" INT REFERENCES "user"
);

CREATE TABLE "message" (
    "id" SERIAL PRIMARY KEY, 
    "user_id" INT REFERENCES "user", 
    "room_id" INT REFERENCES "chatroom" ON DELETE CASCADE, 
    "content" VARCHAR(500) NOT NULL,
    "time_posted" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "room_member" (
    "id" SERIAL PRIMARY KEY, 
    "user_id" INT REFERENCES "user", 
    "room_id" INT REFERENCES "chatroom"
);

CREATE TABLE "buddy" (
    "id" SERIAL PRIMARY KEY, 
    "user_id_1" INT REFERENCES "user", 
    "user_id_2" INT REFERENCES "user", 
    "accepted" BOOLEAN DEFAULT FALSE
);

CREATE TABLE "block_list" (
    "id" SERIAL PRIMARY KEY, 
    "user_id" INT REFERENCES "user", 
    "blocked_user_id" INT REFERENCES "user", 
    "block_type" VARCHAR(30) NOT NULL
);
