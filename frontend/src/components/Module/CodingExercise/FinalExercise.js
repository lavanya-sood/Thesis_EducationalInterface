import React from 'react';
import { Typography, Button, Modal, Fade, Backdrop} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import useStyles from './styles.js';
import Editor from './Editor'
//import { Markup } from 'interweave';


const FinalExercise = (moduleInfo) => {
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

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };



    React.useEffect(() => {
        console.log(moduleInfo.moduleInfo);
        setPageTile(moduleInfo.moduleInfo.pageTitle);

        let textInfo = moduleInfo.moduleInfo.textDescription;
        textInfo = textInfo.replace(/\\n/g, '\n');
        textInfo = textInfo.replace(/\\t/g, '\t');
        textInfo = textInfo.replace(/\\r/g, '\r');
        //starterCode = starterCode.replace("\r\n\t", "\r\n\t");
        //starterCode = starterCode.replace("\\r\\n", "\r\n");
        setQuestion(textInfo);

        //setQuestion(moduleInfo.moduleInfo.textDescription);
        setQuestionNumber(moduleInfo.moduleInfo.questionNumber);

        console.log("THIS MODULE");

        // if (moduleInfo.moduleInfo.questionNumber === 27) {
        //     const imgsrc = "data:image/png;base64," + moduleInfo.moduleInfo.hint;
        //     const imageV = <img src={imgsrc} alt="coding" width="100%"/>;
        //     setHint("imageV");
        //     setImg(imageV);
        // } else {
        //     setHint(moduleInfo.moduleInfo.hint);
        // }

        console.log(moduleInfo.moduleInfo.imgSrc);
        const imgsrc = "data:image/png;base64," + moduleInfo.moduleInfo.imgSrc;
        const imageV = <img src={imgsrc} alt="coding" width="100%"/>;
        setHint(moduleInfo.moduleInfo.hint);
        setImg(imageV);
 
        setQuestionNumber(moduleInfo.moduleInfo.questionNumber);
        let starterCode = moduleInfo.moduleInfo.starterCode;
        starterCode = starterCode.replace(/\\n/g, '\n');
        starterCode = starterCode.replace(/\\t/g, '\t');
        starterCode = starterCode.replace(/\\r/g, '\r');
        //starterCode = starterCode.replace("\r\n\t", "\r\n\t");
        //starterCode = starterCode.replace("\\r\\n", "\r\n");
        setHtml(starterCode);

        setAnswer(moduleInfo.moduleInfo.correctAnswer);


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
        setSrcDoc(`
           <html>
            <body>${html}</body>
           </html>
        `);
    };

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
        } else  {
            setError(true);
            setSuccess(false);
            setStatus("There is an error in your code");
        }
    }
    

    return (
        <div className={classes.textInstructions}>
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
                    <Button variant="contained" color="secondary" className={classes.codeButtons} onClick={handleOpen}> Hint </Button>
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