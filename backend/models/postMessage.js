import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    pageNumber: Number,
    questionType: String,
    sectionTitle: String,
    videoLocation: String,
    textDescription: String,
    questionOptions: String,
    questionSolution: String,
    imageLocation: String,
});

const PostMessage = mongoose.model('Questions',postSchema);

export default PostMessage ;