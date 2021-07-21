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
    const {questionNumber: questionNumber} = req.params;

    // modulequestions.findOne({ questionNumber: { $eq: questionNumber } });

    const foundModule = await modulequestions.find({questionNumber: questionNumber} , function (err, data) {
        if(err){
            console.log(err);
        }
    });

    //const foundModule = await modulequestions.findOne(questionNumber);
    res.json(foundModule);
};