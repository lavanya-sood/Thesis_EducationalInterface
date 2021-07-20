import mongoose from "mongoose";

const moduleSchema = mongoose.Schema({
    questionNumber: Number,
    questionType: String,
    pageTitle: String,
    //videoLocation: String,
    textDescription: String,
    //answerOptions: String,
    //correctAnswer: String,
    //starterCode: String,
    //hint: String,
});

const modulequestions = mongoose.model('modulequestions',moduleSchema);

export default modulequestions ;