CREATE DATABASE jwtUsers;

--\c jwtUsers = to connect to the created database
--Install 3rd library module for generating UUID
--CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users(
    user_id uuid DEFAULT uuid_generate_v4 (),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL, 
    user_password VARCHAR(255) NOT NULL
);

--Insert a test user to check if table is working

INSERT INTO (user_name, user_email, user_password) VALUES('henry', 'henryly213@gmail.com', 'kthl8822');


