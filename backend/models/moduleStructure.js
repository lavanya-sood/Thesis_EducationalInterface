import mongoose from "mongoose";

// the basic schema that is followed by the modules
// depending on the questionType the other fields may differ
const moduleSchema = mongoose.Schema({
    questionNumber: Number,
    questionType: String,
    pageTitle: String,
    textDescription: String,
});

const modulequestions = mongoose.model('modulequestions',moduleSchema);

export default modulequestions ;