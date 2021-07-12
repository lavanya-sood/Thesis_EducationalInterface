import React from 'react';
import { AppBar,Paper ,Typography, Button, Toolbar,Grid, Container, TextField} from '@material-ui/core';
import useStyles from './styles.js';


const CodingExercise = () => {
    const classes = useStyles();

    

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
                    <Button variant="contained" color="secondary" className={classes.codeButtons}> Run </Button>
                </div>
                <div>
                    <div className={classes.ext1}>
                        <Typography variant="h6"> Coding Window </Typography>
                        <div className={classes.htmlWindow}>
                        </div>
                    </div>
                    <div className={classes.ext2}>
                        <Typography variant="h6"> Output Window </Typography>
                        <div className={classes.outputWindow}>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CodingExercise;