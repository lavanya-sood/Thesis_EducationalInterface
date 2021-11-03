# Backend Folder

This is the folder that stores the server side of the application 

## Running backend
    
    npm start

## First Time Setup

You need to create a `.env` file in which you enter your own `CONNECTION_URL`. This variable is needed so that your backend can connect to the MongoDB database. Look at `.env.example` for what your file should look like. **The code will not run if you miss this step.** 


## JavaScript Libraries used

### Express

The backend framework for Node.js

### Mongoose

Library that is used to connect the local application to the mongoDB database

### Nodemon

Monitoring script that builds the backend and refeshes it automatically while server is running in the terminal.

### dotenv

Allows us to save variables in a private file so that they are not posted on github publically.

## Folder Structure

### index.js

This is the main file that is used to run the backend server. It contains the backend url and the express application.

### Routes

The routes folder stores the routes for the backend server that are used to perform specific tasks

### Controllers

Implementation of the routes present in the routes folder

### Models

Stores the basic schema that is followed by different collections in the mongoDB database.

