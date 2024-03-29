import React from 'react';
import { Typography, Button, Modal, Fade, Backdrop} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import useStyles from './styles.js';
import Editor from './Editor'

const CodingExercise = ({moduleInfo, allowNext}) => {
    const classes = useStyles();

    // the module information
    const [html, setHtml] = React.useState("");
    const [srcDoc, setSrcDoc] = React.useState('');
    const [pageTitle,setPageTile] = React.useState(""); 
    const [question,setQuestion] = React.useState(""); 
    const [questionNumber,setQuestionNumber] = React.useState(""); 
    const [hint,setHint] = React.useState(""); 
    const [correctAnswer,setAnswer] = React.useState(""); 

    // status of answer
    const [error,setError] = React.useState(false);
    const [success,setSuccess] = React.useState(false);
    const [answerStatus,setStatus] = React.useState("");

    // time for answer 
    const [seconds, setSeconds] = React.useState(0);
    const [doneQuestion, setDone] = React.useState(false);
    const countRef = React.useRef(null);

    // number of attempts
    const [attempts, setAttempts] = React.useState(1);

    // module opening
    const [open, setOpen] = React.useState(false);
    
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    React.useEffect(() => {
        console.log(moduleInfo);
        setPageTile(moduleInfo.pageTitle);

        // Clean up the database description
        let textInfo = moduleInfo.textDescription;
        textInfo = textInfo.replace(/\\n/g, '\n');
        textInfo = textInfo.replace(/\\t/g, '\t');
        textInfo = textInfo.replace(/\\r/g, '\r');
        setQuestion(textInfo);

        setQuestionNumber(moduleInfo.questionNumber);

        if (moduleInfo.questionNumber === 27) {
            const imgsrc = "data:image/png;base64," + moduleInfo.hint;
            const imageV = <img src={imgsrc} alt="coding" width="500px"/>;
            setHint(imageV);
        } else {
            setHint(moduleInfo.hint);
        }
        setQuestionNumber(moduleInfo.questionNumber);
        
        // Clean up the database code
        let starterCode = moduleInfo.starterCode;
        starterCode = starterCode.replace(/\\n/g, '\n');
        starterCode = starterCode.replace(/\\t/g, '\t');
        starterCode = starterCode.replace(/\\r/g, '\r');


        let answerCode = moduleInfo.correctAnswer;
        answerCode = answerCode.replace(/\\n/g, '\n');
        answerCode = answerCode.replace(/\\t/g, '\t');
        answerCode = answerCode.replace(/\\r/g, '\r');
        setAnswer(answerCode);

        countRef.current = setInterval(() => {
            setSeconds((seconds) => seconds + 1)
        }, 1000);
        
        if (localStorage.getItem("currentCode") != null && localStorage.getItem("currentExercise") != null && parseInt(localStorage.getItem("currentExercise")) === parseInt(moduleInfo.questionNumber)) {
            setHtml(localStorage.getItem("currentCode"));
        } else {
            setHtml(starterCode);
        }

        if ( localStorage.getItem('currentTime') != null && localStorage.getItem("currentExercise") != null && parseInt(localStorage.getItem("currentExercise")) === parseInt(moduleInfo.questionNumber)) {
            setSeconds(parseInt(localStorage.getItem('currentTime')));
        }

        let pages = [];
        if (JSON.parse(localStorage.getItem("pages")) != null) {
            pages = JSON.parse(localStorage.getItem("pages"))
            console.log(pages);
        } 

    
        if (!pages.includes(parseInt(moduleInfo.questionNumber))) {
            localStorage.setItem('currentExercise',moduleInfo.questionNumber);
        } else  {
            setDone(true);
            clearInterval(countRef.current);
        }
        
    },[moduleInfo]);

     //run the user code and show it in the div
    const runCode = () => {
        if (!doneQuestion) {
            localStorage.setItem('currentCode',html);
            localStorage.setItem('currentTime',seconds);
        }
        setSrcDoc(`${html}`);
    };

    //clean up the user input
    const stripString = (codeString) => {
        let stripedString = codeString;
        stripedString = stripedString.replace(/"/g, '\'');
        stripedString = stripedString.replace(/[\s\n\t\r]/g, '');
        //stripedString = stripedString.toLowerCase();
        return stripedString;
    }

    // function adds answer to the database
    async function addAnswer(gaveUp) {
        
        const data = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify( {
              userId: localStorage.getItem('userId'),
              questionNumber: questionNumber,
              timeSpent: seconds,
              attemptCount: attempts,
              attempt: html,
              gaveUp: gaveUp,
            } )
        };

        console.log(data);
        
        const url = 'http://127.0.0.1:5000/answers';
        let res = await fetch(url, data);
        res = await res.json();
        console.log(res);
    }

    // function checks whether user got it correct or incorrect
    const checkCode = () => {
        
        // if the question was already finished do nothing
        if (doneQuestion) {
            return;
        }

        // clean up user input and database code
        const newAnswer = stripString(html); 
        const correctVal = stripString(correctAnswer);

        // check if the strings match
        if (correctVal === newAnswer) {
            setError(false);
            setSuccess(true);
            setStatus("You got it correct");
            allowNext();
            let pages = [];
            if (JSON.parse(localStorage.getItem("pages")) != null) {
              pages = JSON.parse(localStorage.getItem("pages"))
              console.log(pages);
            } 
      
            if (!pages.includes(questionNumber)) {
              pages.push(questionNumber);
            }
            localStorage.setItem("pages", JSON.stringify(pages));

            clearInterval(countRef.current);
            localStorage.removeItem("currentCode");
            localStorage.removeItem('currentTime');
            localStorage.removeItem("currentExercise");
        
        // if the strings don't match
        } else  {
            setError(true);
            setSuccess(false);
            setStatus("There is an error in your code");
            setAttempts(attempts + 1);
        }
        addAnswer(0);
    }

    // function allowing user to give up on the question
    const giveUpFunction =  () => {

        clearInterval(countRef.current);
        clearInterval(countRef.current);
        allowNext();
        addAnswer(1);
        setDone(true);
        
        // show the user the correct answer
        let correctAnswer2 = correctAnswer;
        correctAnswer2 = correctAnswer2.replace(/\\n/g, '\n');
        correctAnswer2 = correctAnswer2.replace(/\\t/g, '\t');
        correctAnswer2 = correctAnswer2.replace(/\\r/g, '\r');

        setHtml(correctAnswer2); 
        localStorage.removeItem("currentCode");
        localStorage.removeItem('currentTime');
        localStorage.removeItem("currentExercise");
        addAnswer(1);

        setSrcDoc(`${correctAnswer2}`);
    };
    

    return (
        <div className={classes.textInstructions}>
            <div className={classes.timerDiv}>
                <Typography p className={classes.timeText}> {seconds} seconds </Typography>
            </div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                <div className={classes.paper}>
                    <Typography variant="h5"> Coding Hint </Typography>
                    <br/>
                    <Typography paragraph> {hint} </Typography>
                </div>
                </Fade>
            </Modal>

            <Typography variant="h4"> {pageTitle} </Typography>
            <br/>
            {/* <p> {val} </p> */}
            {/* <Markup content={val} /> */}
            <Typography paragraph>
                {question}
            </Typography>
            {/* <Typography variant="h5"> {answerStatus} </Typography> */}
            {error ? <Alert severity='error'>{answerStatus}</Alert> : <></> }
            {success ? <Alert severity='success'>{answerStatus}</Alert> : <></> }
            <div className={classes.codingWindows}>
                <div className={classes.buttonGroup}>
                    {attempts > 2 ? <Button variant="contained" color="secondary" className={classes.codeButtons} onClick={giveUpFunction}> Give up? </Button> : <></>}
                    {attempts > 1 ? <Button variant="contained" color="secondary" className={classes.codeButtons} onClick={handleOpen}> Hint </Button> : <></>}
                    <Button variant="contained" color="secondary" className={classes.codeButtons} onClick={runCode}> Run </Button>
                    <Button variant="contained" color="secondary" className={classes.codeButtons} onClick={checkCode}> Check </Button>
                </div>
                <div className={classes.codes}>
                    <div className={classes.ext1}>
                        <Typography variant="h6"> Coding Window </Typography>
                        <div className={classes.htmlWindow}>
                            <Editor
                            language="xml"
                            value={html}
                            onChange={setHtml}
                            />
                        </div>
                    </div>
                    <div className={classes.ext2}>
                        <Typography variant="h6"> Output Window </Typography>
                        <div className={classes.outputWindow}>
                            <iframe
                            srcDoc={srcDoc}
                            title="output"
                            sandbox="allow-scripts"
                            frameBorder="0"
                            width="100%"
                            height="100%"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CodingExercise;