import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    pageNumber: Number,
    questionNumber: Number,
    sectionTitle: String,
    pageHeading: String,
    videoLocation: String,
    videoLength: Number,
    videoTitle: String,
    questionType: String,
    textDescription: String,
    questionSolution: String,
    imageLocation: String,
});

const PostMessage = mongoose.model('Questions',postSchema);

export default PostMessage;