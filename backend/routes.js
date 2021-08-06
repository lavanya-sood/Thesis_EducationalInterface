// function is called by the server when api calls are made
function routes(app, db){

    // Module function
    app.get('/module', async (req, res) => {
        
        let questionNumber = parseInt(req.query.questionNumber);
        console.log(req.query.questionNumber);

        const moduleDb = db.collection("modulequestions");

        if (req.query.questionNumber == undefined ) {
            //res.status(200).json({'wow': 'wow'});

            moduleDb.find().toArray( ( err, tup ) =>
            {
                if ( err ) throw err;
                if ( tup ) {
                    //const jsonTup = JSON.stringify( tup );
                    res.status(200).json(tup);
                    //console.log(tup);
                } else {
                    res.status(404).json({message: "Modules Not Found" });
                }
            } );




        } else {
            //res.status(200).json({'moduleQuestions': 200});

            moduleDb.find({questionNumber: questionNumber}).toArray((err, tup) => {
                if (err) throw err;
                if (tup) {
                    res.status(200).json(tup);
                } else {
                    res.status(404).json({message: "Module Not Found" });
                }
            })


        }
        console.log(questionNumber);
        
        
        
    });
}

module.exports = routes