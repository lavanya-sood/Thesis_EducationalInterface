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

#### Coding Exercises

The coding exercises store the starter code for all the questions in a String format. This is then converted to HTML so that it can be rendered on the page.

##### Json Structure
```
{
    "questionNumber" : int,
    "questionType" : String,
    "pageTitle" : String,
    "textDescription": String,
    "starterCode": String,
    "correctAnswer": String,
    "hint": String
}
```

For the final question, an extra field is added to the JSON structure to show the users the image that they need to recreate. This stores the image in a Base-64 Format

```
"imgSrc": String
```

#### Multiple Choice Questions

The options in the multiple choice questions are saved as a string and are split into options in the frontend. This is the structure they follow:

> Option1 || Option2 .....

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

* **useranswers.json -** Contains the answers that were attempted by the users
* **pagenavigations.json -** Contains the order of navigation that was used by the users

## How to add a new value