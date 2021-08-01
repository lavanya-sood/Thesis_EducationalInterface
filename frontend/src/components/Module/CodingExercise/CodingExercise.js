import React from 'react';
import { Typography, Button, Modal, Fade, Backdrop} from '@material-ui/core';
import useStyles from './styles.js';
import Editor from './Editor'
//import { Markup } from 'interweave';


const CodingExercise = (moduleInfo) => {
    const classes = useStyles();

    const [html, setHtml] = React.useState("");
    const [srcDoc, setSrcDoc] = React.useState('');

    const [pageTitle,setPageTile] = React.useState(""); 
    const [question,setQuestion] = React.useState(""); 
    const [questionNumber,setQuestionNumber] = React.useState(""); 
    
    const [hint,setHint] = React.useState(""); 
    const [correctAnswer,setAnswer] = React.useState(""); 
    const [startCode,setStartCode] = React.useState(""); 

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };



    React.useEffect(() => {
        console.log(moduleInfo.moduleInfo);
        setPageTile(moduleInfo.moduleInfo.pageTitle);
        setQuestion(moduleInfo.moduleInfo.textDescription);
        setQuestionNumber(moduleInfo.moduleInfo.questionNumber);

        setHint(moduleInfo.moduleInfo.hint);
        setQuestionNumber(moduleInfo.moduleInfo.questionNumber);
        let starterCode = moduleInfo.moduleInfo.starterCode;
        starterCode = starterCode.replace(/\\n/g, '\n');
        starterCode = starterCode.replace(/\\t/g, '\t');
        starterCode = starterCode.replace(/\\r/g, '\r');
        //starterCode = starterCode.replace("\r\n\t", "\r\n\t");
        //starterCode = starterCode.replace("\\r\\n", "\r\n");
        setHtml(starterCode);


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
            <div className={classes.codingWindows}>
                <div className={classes.buttonGroup}>
                    <Button variant="contained" color="secondary" className={classes.codeButtons} onClick={handleOpen}> Hint </Button>
                    <Button variant="contained" color="secondary" className={classes.codeButtons}> Check </Button>
                    <Button variant="contained" color="secondary" className={classes.codeButtons} onClick={runCode}> Run </Button>
                </div>
                <div className={classes.codes}>
                    <div className={classes.ext1}>
                        <Typography variant="h6"> Coding Window (Inside Body Tag) </Typography>
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