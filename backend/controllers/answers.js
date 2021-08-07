import useranswers from "../models/answerStructure.js";

// function adds the user's attempt to the mongodb database 
export const addUserAnswer = async (req,res) => {
    const answer = req.body;
    
    // set the body according to the useranswers schema
    const newAnswer = new useranswers(answer);

    try {
        // save the answer in the database
        await newAnswer.save();
        res.status(201).json(newAnswer);

    } catch(error) {
        // error message
        res.status(409).json({message: error.message });
    }
};

