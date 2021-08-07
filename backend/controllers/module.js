import modulequestions from "../models/moduleStructure.js";

// function gets all the modules from the database
export const getAllModules = async (req,res) => {
    try {

        // find all modules that match the schema
        const moduleQuestions = await modulequestions.find();
        console.log(moduleQuestions.length);
        res.status(200).json(moduleQuestions);

    } catch(error) {
        // error message
        res.status(404).json({message: error.message });
    }
};

// function gets a specific module from the database given the question number
export const getSpecificModule = async (req,res) => {
    
    // get question number from parameters
    const {questionNumber: questionNumber} = req.params;

    // find the module with the given question number
    const foundModule = await modulequestions.find({questionNumber: questionNumber} , function (err, data) {
        if(err){
            res.status(404).json({message: err});
        }
    });

    res.status(200).json(foundModule);
};