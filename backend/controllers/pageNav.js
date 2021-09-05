import pageNavigationS from "../models/navStructure.js";

// function adds the user's attempt to the mongodb database 
export const addPageNavigation = async (req,res) => {
    const answer = req.body;
    
    // set the body according to the useranswers schema
    const newPage = new pageNavigationS(answer);

    try {
        // save the answer in the database
        await newPage.save();
        res.status(201).json(newPage);

    } catch(error) {
        // error message
        res.status(409).json({message: error.message });
    }
};

