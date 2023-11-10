# Gamdom Betting Slip API Service

--------------------------------------------
--------------------------------------------

## Run the application

#### 1. Make sure you have installed NodeJS.
- You can verify this by typing `node -v` in your terminal.

#### 2. Make sure you have installed NPM.
- You can verify this by typing `npm -v` in your terminal.

#### 3. Make sure you have installed TypeScript.
- You can verify this by typing `tsc -v` in your terminal.
  
#### 4. Make sure you have installed PostgreSQL.

#### 5. Having PostgreSQL installed, we will need to create a database and 2 different tables inside that database.
- This step is needed because the application will do operations on that specific database and tables.
- To create the tables you can run the following on your SQLShell.
- For Betting Slips table:
`CREATE TABLE betting_slips (
ID SERIAL PRIMARY KEY,
user_id INT NOT NULL,
event_id INT NOT NULL,
amount INT,
winning_team_id INT NOT NULL,
creation_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP);`

- And for Users table:
`CREATE TABLE users (
ID SERIAL PRIMARY KEY,
user_name VARCHAR(255),
password VARCHAR(255));`

#### 6. Make sure the database connection settings (database, password, etc) on `db.ts` match the ones you got.

#### 7. And for the fun part, to run the application, all you need to do is open your terminal on the root folder:
- Run `npm install` to make sure you have all the needed packages installed and you have a `node_modules`.
- Run `npm run start`. 
- This latest command does two things:
- First, runs a script on the `package.json` that compiles the TypeScript files and creates a `dist/` folder where the JS files will live. 
- Finally, it runs the `dist/server.js` file.

--------------------------------------------
--------------------------------------------

## Make Requests

- There's a Postman collection in the tools folder with all the necessary requests to the application.
- You should download it and use it as you like.
- Make sure you register a user first and do a login to grab the Authorization Token.
- This is important because all the Betslip requests need the Authorization Token set on the Headers.

`-H Authorization:${TOKEN_OBTAINED_FROM_LOGIN}`

- After this, you should be good to go!