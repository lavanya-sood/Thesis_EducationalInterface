import React from 'react';
import { AppBar,Paper ,Typography, Button, Toolbar,Grid, Container, TextField} from '@material-ui/core';
import useStyles from './styles.js';
import Editor from './Editor'

const CodingExercise = () => {
    const classes = useStyles();

    const [html, setHtml] = React.useState('')
    const [srcDoc, setSrcDoc] = React.useState('')
  
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
            <Typography variant="h4"> Hello World Coding </Typography>
            <br/>
            <Typography paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
                facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
                gravida rutrum quisque non tellus.
            </Typography>
            <div className={classes.codingWindows}>
                <div className={classes.buttonGroup}>
                    <Button variant="contained" color="secondary" className={classes.codeButtons}> Hint </Button>
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