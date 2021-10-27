# Thesis Educational Interface

The goal of this project is to develop a web-based STEM training program that can teach students a topic they are unfamiliar with by using Human-Computer Interaction design and technical knowledge.

## First time setup instructions

Clone the repository via git

### MongoDB Setup:

1. Setup a MongoDB Account. Follow [this tutorial](https://www.youtube.com/watch?v=esKNjzDZItQ ) to learn how to set up an account on MondoDB.
2. Create a new database called 'Module'
3. Use the json files that are located in the *Database* and upload them into the databse as collections with the same name as the file. Watch [this video](https://www.youtube.com/watch?v=IjAflHMkuzk) for more information on how to do this 
4. **IMPORTANT:**  In the file backend/index.js change the `CONNECTION_URL` to the URL of your own MongoDB database otherwise you will not be able to see the changes.

### Database Setup:

One of the main things that need to be changed in the database are the `videoLocation` links. As the current links navigate to the previous student's private youtube channel, all of these videos need to be reuploaded to youtube as unlisted/listed videos so that the new developer has complete control over the videos.

You can find the original videos in the *media* folder. The name of each video corresponds to the `questionNumber` or the module value that it is linked to.

After all the videos are uploaded to youtube replace all the links inside the mongoDB collection for the videoLocation attribute otherwise the videos will not work. 


### Backend Setup
In the Backend folder:   
    npm install

### Frontend Setup
Frontend:

    npm install
    
## Running the server

Terminal one (Backend folder):
    
    npm start

Terminal two (Frontend folder):

    npm run start

You should now be able to manually edit the code whichever way you like.
