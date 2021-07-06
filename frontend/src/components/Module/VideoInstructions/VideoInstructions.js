import React from 'react';
import { AppBar,Paper ,Typography, Button, Toolbar,Grid, Container, TextField} from '@material-ui/core';
import useStyles from './styles.js';


const VideoInstructions = () => {
    const classes = useStyles();    

    return (
        <div className={classes.videoInstructions}>
            <Typography variant="h4"> Hello World Video </Typography>
            <br/>
            <div className={classes.videoPanel}>
                <video className={classes.videoBox}> </video>
            </div>
        </div>
    );
};

export default VideoInstructions;