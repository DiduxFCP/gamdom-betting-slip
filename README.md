1. install node and npm and TS
2. install postgreSQL and create database with name on db.ts

3. create tables called betting_slips and users

gamdon_betslip=# CREATE TABLE betting_slips (
gamdon_betslip(# ID SERIAL PRIMARY KEY,
gamdon_betslip(# user_id INT,
gamdon_betslip(# event_id INT,
gamdon_betslip(# amount INT,
gamdon_betslip(# winning_team_id INT,
gamdon_betslip(# timestamp INT);

AND 

gamdon_betslip=# CREATE TABLE users (
gamdon_betslip(# ID SERIAL PRIMARY KEY,
gamdon_betslip(# user_name VARCHAR(255),
gamdon_betslip(# password VARCHAR(255));

4. then run command: `npm run start`