import modulequestions from "../models/moduleStructure.js";

export const getAllModules = async (req,res) => {
    try {
        console.log("Hey");
        const moduleQuestions = await modulequestions.find();

        console.log(moduleQuestions.length);

        res.status(200).json(moduleQuestions);
    } catch(error) {
        res.status(404).json({message: error.message });
    }
};

export const getSpecificModule = async (req,res) => {
    const post = req.body;

    const newPost = newPostMessage(post);

    try {
        await newPost.save();

        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({message: error.message });
    }
};