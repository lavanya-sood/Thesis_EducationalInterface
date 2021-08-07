import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import moduleRoutes from './routes/module.js';
import answerRoutes from './routes/answers.js';

// create the express application
const app = express();

// allow cors
app.use(bodyParser.json({limit:"30mb", extended: true}));
app.use(bodyParser.urlencoded({limit:"30mb", extended: true}));
app.use(cors());

// get the routes
app.use('/module',moduleRoutes);
app.use('/answers',answerRoutes);

// setup the url
const CONNECTION_URL =  'mongodb+srv://thesisoriginal:thesispassword123@cluster0.qgqkr.mongodb.net/Module?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

// connect the application to the mongoDB database
mongoose.connect(CONNECTION_URL,{useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> app.listen(PORT, ()=>console.log(`Server running on port ${PORT}`)))
    .catch((error)=> error.message);

mongoose.set('useFindAndModify',false);