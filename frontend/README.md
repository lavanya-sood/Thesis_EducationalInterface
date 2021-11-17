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

### How the coding exercises work

The way the coding questions are currently tested is by stripping the *correctAnswer* string from the database and the user attempt of all the extra characters like space, newline and return. This was done so that the answer strings could be matched with each other to check if the user attempt is correct. Evertime the user presses *Check* the number of user Attempts in increasesd.

Everytime the user presses the *Run* button their attempt and the time its correctly taken is stored in the local storage so that the user is allowed to move back and forth between the instructions and the questions. Then once the user answers the question correctly by pressing the *Check* button or *Give Up* the attempt and time is removed from the local storage so that the user can move onto the new question. 

> For future extensions, you can try to find a different way to test the user answers to give them more freedom to solve a question differently and it can still be considered okay

### How the multiple choice exercises work

For the multiple choice questions, once the user selects an answer and checks it the frontend tries to match the *correctAnswer* to see whether they got it right or wrong. If the user gets it incorrect, the number of attempts for the question in increased. 

> Currently, the multiple choice question time resets everytime the user goes back forth between the instructions and question itself. **You need to look for a way to add the time to local storage every second for the multiple choice question without slowing the application down so that the correct time overall can be recorded.**
