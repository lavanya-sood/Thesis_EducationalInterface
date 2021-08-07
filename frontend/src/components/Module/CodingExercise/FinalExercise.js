import React from 'react';
import { Typography, Button, Modal, Fade, Backdrop} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import useStyles from './styles.js';
import Editor from './Editor'
//import { Markup } from 'interweave';


const FinalExercise = ({moduleInfo, allowNext}) => {
    const classes = useStyles();

    const [html, setHtml] = React.useState("");
    const [srcDoc, setSrcDoc] = React.useState('');

    const [pageTitle,setPageTile] = React.useState(""); 
    const [question,setQuestion] = React.useState(""); 
    const [questionNumber,setQuestionNumber] = React.useState(""); 
    
    const [hint,setHint] = React.useState(""); 
    const [correctAnswer,setAnswer] = React.useState(""); 

    const [open, setOpen] = React.useState(false);

    const [error,setError] = React.useState(false);
    const [success,setSuccess] = React.useState(false);
    const [answerStatus,setStatus] = React.useState("");

    const [imgElement, setImg] = React.useState(null);

    const [seconds, setSeconds] = React.useState(0);
    const [isActive, setIsActive] = React.useState(false);

    const [failed, setFailed] = React.useState(false);
    const countRef = React.useRef(null);

    const [attempts, setAttempts] = React.useState(1);
    const [doneQuestion, setDone] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };



    React.useEffect(() => {
        console.log(moduleInfo);
        setPageTile(moduleInfo.pageTitle);

        let textInfo = moduleInfo.textDescription;
        textInfo = textInfo.replace(/\\n/g, '\n');
        textInfo = textInfo.replace(/\\t/g, '\t');
        textInfo = textInfo.replace(/\\r/g, '\r');
        //starterCode = starterCode.replace("\r\n\t", "\r\n\t");
        //starterCode = starterCode.replace("\\r\\n", "\r\n");
        setQuestion(textInfo);

        //setQuestion(moduleInfo.moduleInfo.textDescription);
        setQuestionNumber(moduleInfo.questionNumber);

        console.log("THIS MODULE");

        // if (moduleInfo.moduleInfo.questionNumber === 27) {
        //     const imgsrc = "data:image/png;base64," + moduleInfo.moduleInfo.hint;
        //     const imageV = <img src={imgsrc} alt="coding" width="100%"/>;
        //     setHint("imageV");
        //     setImg(imageV);
        // } else {
        //     setHint(moduleInfo.moduleInfo.hint);
        // }

        console.log(moduleInfo.imgSrc);
        const imgsrc = "data:image/png;base64," + moduleInfo.imgSrc;
        const imageV = <img src={imgsrc} alt="coding" width="100%"/>;
        setHint(moduleInfo.hint);
        setImg(imageV);
 
        setQuestionNumber(moduleInfo.questionNumber);
        let starterCode = moduleInfo.starterCode;
        starterCode = starterCode.replace(/\\n/g, '\n');
        starterCode = starterCode.replace(/\\t/g, '\t');
        starterCode = starterCode.replace(/\\r/g, '\r');

        setAnswer(moduleInfo.correctAnswer);

        countRef.current = setInterval(() => {
            setSeconds((seconds) => seconds + 1)
        }, 1000);

        console.log(parseInt(localStorage.getItem("currentExercise")) === parseInt(moduleInfo.questionNumber));
        if (localStorage.getItem("currentCode") != null && localStorage.getItem('currentTime') != null && localStorage.getItem("currentExercise") != null && parseInt(localStorage.getItem("currentExercise")) === parseInt(moduleInfo.questionNumber)) {
            setHtml(localStorage.getItem("currentCode"));
            setSeconds(parseInt(localStorage.getItem('currentTime')));
        } else {
            setHtml(starterCode);
        }

        let pages = [];
        if (JSON.parse(localStorage.getItem("pages")) != null) {
            pages = JSON.parse(localStorage.getItem("pages"))
            console.log(pages);
        } 

        console.log("ASAAAAAAAAAAA");
    
        if (!pages.includes(parseInt(moduleInfo.questionNumber))) {
            localStorage.setItem('currentExercise',moduleInfo.questionNumber);
        } else  {
            console.log("hER <<----");
            setDone(true);
            clearInterval(countRef.current);
        }


    },[moduleInfo]);

    //const val = "Hey how are <b> you? </b><br/><h3>Sup</h3>";
  
    // React.useEffect(() => {
    //   const timeout = setTimeout(() => {
    //     setSrcDoc(`
    //       <html>
    //         <body>${html}</body>
    //       </html>
    //     `)
    //   }, 250)
  
    //   return () => clearTimeout(timeout)
    // }, [html])
    
    const runCode = () => {
        localStorage.setItem('currentCode',html);
        localStorage.setItem('currentTime',seconds);
        setSrcDoc(`
           <html>
            <body>${html}</body>
           </html>
        `);
    };

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

    const stripString = (codeString) => {
        let stripedString = codeString;
        stripedString = stripedString.replace(/\n/g, '');
        stripedString = stripedString.replace(/\t/g, '');
        stripedString = stripedString.replace(/\r/g, '');
        stripedString = stripedString.replace(/\s/g, '');
        stripedString = stripedString.replace(/"/g, '\'');
        stripedString = stripedString.replace(/ /g, '');
        stripedString = stripedString.toLowerCase();
        return stripedString;
    }

    const checkCode = () => {
        console.log(html);
        const newAnswer = stripString(html);
        console.log(newAnswer);

        
        const correctVal = stripString(correctAnswer);
        console.log(correctVal);

        if (correctVal === newAnswer) {
            setError(false);
            setSuccess(true);
            setStatus("You got it correct");
            clearInterval(countRef.current);
            localStorage.removeItem("currentCode");
            localStorage.removeItem('currentTime');
            localStorage.removeItem("currentExercise");
            allowNext();
        } else  {
            setError(true);
            setSuccess(false);
            setStatus("There is an error in your code");
            setAttempts(attempts + 1);
        }
        addAnswer(0);
    }

    const giveUpFunction =  () => {
        console.log("giveUp");

        clearInterval(countRef.current);
        //setHtml(correctAnswer);
        clearInterval(countRef.current);
        setFailed(true);
        allowNext();

        setHtml(correctAnswer);
        localStorage.removeItem("currentCode");
        localStorage.removeItem('currentTime');
        localStorage.removeItem("currentExercise");
        addAnswer(1);

        setSrcDoc(`
           <html>
            <body>${correctAnswer}</body>
           </html>
        `);
        
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
            <Typography className={classes.paragraph} paragraph dangerouslySetInnerHTML={{__html: question}} /> 
            {/* <Typography variant="h5"> {answerStatus} </Typography> */}
            {error ? <Alert severity='error'>{answerStatus}</Alert> : <></> }
            {success ? <Alert severity='success'>{answerStatus}</Alert> : <></> }
            <div className={classes.codingWindows}>
                <div className={classes.buttonGroup}>
                    {attempts > 4 ? <Button variant="contained" color="secondary" className={classes.codeButtons} onClick={giveUpFunction}> Give up? </Button> : <></>}
                    {attempts > 1 ? <Button variant="contained" color="secondary" className={classes.codeButtons} onClick={handleOpen}> Hint </Button> : <></>}
                    <Button variant="contained" color="secondary" className={classes.codeButtons} onClick={checkCode}> Check </Button>
                    <Button variant="contained" color="secondary" className={classes.codeButtons} onClick={runCode}> Run </Button>
                </div>
                <div className={classes.codesFinal}>
                    <div className={classes.ext1Final}>
                        <Typography variant="h6"> Desired Output </Typography>
                        <div className={classes.imgWindow}>
                            {imgElement}
                        </div>
                    </div>
                    <div className={classes.ext2Final}>
                        <Typography variant="h6"> Coding Window (Inside Body Tag) </Typography>
                        <div className={classes.htmlWindow}>
                            <Editor
                            language="xml"
                            value={html}
                            onChange={setHtml}
                            />
                        </div>
                    </div>
                    <div className={classes.ext3Final}>
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

export default FinalExercise;