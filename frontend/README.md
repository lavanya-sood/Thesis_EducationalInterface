# Frontend Folder

This is the folder that stores the client side of the application 

## Running frontend
    
    npm start

## JavaScript Libraries used

### CodeMirror

Used to create the IDE for the coding exercises

### MaterialUI

Used for the consistent design of the application

## Folder Structure

### src/components

This file stores all of the compoenents that are rendered in the application in separate folders with their own style sheets.

The components are split into the following folders:
* **Header Bar-** The header component of the page
* **Landing-** The first page that the user joins
* **Module-** The content of the module
* **Final-** The final Page shown to the user

### index.js

The main file that is the parent of the application that runs it.

### Inside the module folder

In the module folder, the content is divided into subfolders all of which contain different parts of the document. All of these folders have code which has comments in it which should make it easier to follow.

> **IMPORTANT NOTE** 
> Currently the backend API is set to the "127.0.0.1:5000" .If you change the port on the backend, you would need to change it on all of the frontend files where the API is called.

