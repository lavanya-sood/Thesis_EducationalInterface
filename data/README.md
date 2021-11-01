# Data Folder

This folder contains all the raw data that needs to be added to the MongoDB Database.

> **IMPORTANT NOTE:** 
> On MongoDB, the name of the database is **Module** and the names of the 3 collections are the file names. Please use the exact name that is given to you otherwise the files might not work.

## Files
    
###  modulequestions.json

This file contains the video and text instructions, coding exercises and multiple choice exercises that are shown to the user. 

The json structure for the three diffrent types of module content is different from each other with a few common fields. 

This was done so that all the module could be easily rendered from one file as MondoDB allows for different fields in the same collection

#### Instructions

The video and the text instructions are in the same json objects so that they could be rendered on one page. 

##### Json Structure
```
{
    "questionNumber" : int,
    "questionType" : "instructions",
    "pageTitle" : String,
    "textDescription": String,
    "videoLocation": String,
}
```

Where:
* **questionNumber -** Id of the question
* **questionType -** Type of the question
* **pageTitle -** The heading that will show on top of the page
* **textDescription -** The text version of the instructions. They are written in HTML using divs, p and other tags.
* **videoLocation -** The link to the unlisted youtube video

#### Coding Exercises

##### Json Structure
```
{
    "questionNumber" : int,
    "questionType" : "coding",
    "pageTitle" : String,
    "textDescription": String,
    "starterCode": String,
    "correctAnswer": String,
    "hint": String
}
```

Where:
* **questionNumber -** Id of the question
* **questionType -** Type of the question
* **pageTitle -** The heading that will show on top of the page
* **textDescription -** The text version of the instructions. They are written in HTML using divs, p and other tags.
* **starterCode -** The starting code given to the user. It includes the whole HTML page structure.
* **correctAnswer -** The correct answer to check the user input with
* **hint -** The hint for the user to solve the question


For the final question, an extra field is added to the JSON structure to show the users the image that they need to recreate. This stores the image in a Base-64 Format

```
"imgSrc": String
```

#### Multiple Choice Questions

##### Json Structure
```
{
    "questionNumber" : int,
    "questionType" : "multipleChoice",
    "pageTitle" : String,
    "textDescription": String,
    "answerOptions": String,
    "correctAnswer": String,
}
```

Where:
* **questionNumber -** Id of the question
* **questionType -** Type of the question
* **pageTitle -** The heading that will show on top of the page
* **textDescription -** The text version of the instructions. They are written in HTML using divs, p and other tags.
* **answerOptions -** The options in the multiple choice questions are saved as a string and are split into options in the frontend. This is the structure they follow:
> Option1 || Option2 .....
* **correctAnswer -** The correct answer to check the user input with

#### How to add a new Question

1. You can easily add a question to the module by adding another json object to the collection. Here is a [tutorial](https://www.youtube.com/watch?v=4EXR5rhcEtw&t=455s) on how you should add it to mongoDB using NodeJS. Otherwise you can also directly add a value using the MongoDB web interface
2.  If you add a value to the middle of the module you will need to update the *questionNumber* for all of the questions
3. If you add it to the end, the rest of the objects should be unaffected other than the final question.
4. **IMPORTANT:** Currently the final question is on questionNumber 25. Incase you need to change the question number for it, you would need to change the matching value in the frontend files `Module.js` and `FinalExercise.js` as it is hardcoded.


###  useranswers.json

This file contains the answers that were attempted by the users. You can import this into your database in order to analyse the data or add new enteries to it when you solve an exercise. 

#### Json Structure
```
{
    "userId" : String,
    "questionNumber" : Int,
    "timeSpent" : Int,
    "gaveUp": Int,
    "attemptCount": Int,
    "attempt": String,
}
```

Where:
* **userId -** User who attempted the question
* **questionNumber -** Question that was answered
* **timeSpent -** Time spent on the question
* **gaveUp -** Whether the user gave up
* **attemptCount -** Number of times the user attempted the question
* **attempt -** Attempt the user made

###  pagenavigations.json

This file contains the navigation order of the user throughout the module. You can import this into your database in order to analyse the data or to add the users attempt for the module.

#### Json Structure
```
{
    "userId" : String,
    "navOrder" : [Int],
}
```

Where:
* **userId -** User who attempted the question
* **navOrder -** The order the user goes through the module in


