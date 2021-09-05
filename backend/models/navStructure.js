import mongoose from "mongoose";

const navigationSchema = mongoose.Schema({
    userId: String,
    navOrder: [Number],
});

const pageNavigationS = mongoose.model('pagenavigation',navigationSchema);


export default pageNavigationS;