import mongoose from "mongoose";

const answerSchema = mongoose.Schema({
    userId: String,
    questionNumber: Number,
    timeSpent: Number,
    attemptCount: Number,
    attempt: String,
    gaveUp: Number,
});

const useranswers = mongoose.model('useranswers',answerSchema);


export default useranswers;