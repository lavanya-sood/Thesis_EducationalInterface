import useranswers from "../models/answerStructure.js";

export const addUserAnswer = async (req,res) => {
    const answer = req.body;
    const newAnswer = new useranswers(answer);
    console.log("HERE");
    console.log(answer);
    try {
        await newAnswer.save();

        res.status(201).json(newAnswer);
    } catch(error) {
        res.status(409).json({message: error.message });
    }
};

