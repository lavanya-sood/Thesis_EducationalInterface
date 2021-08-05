import React from 'react';
import { Paper ,Typography, Button,Grid, TextField} from '@material-ui/core';
import useStyles from './styles.js';
import { useHistory } from "react-router-dom";

const Final = () => {
    const classes = useStyles();


    return (
        <Grid container spacing={0} direction="column" alignItems="center" justify="center" className={classes.outsideContainer}>
            <Typography className={classes.heading} variant="h3" align="center"> Thank you for your participation! </Typography>
            <Paper className={classes.insideContainer}>
                <Typography variant="h5" align="center"> The content for this learning module was adapted from: </Typography>
                <Typography paragraph align="center"> The content for this learning module was adapted from: </Typography>
                <Typography paragraph align="center"> The content for this learning module was adapted from: </Typography>
                <Typography paragraph align="center"> The content for this learning module was adapted from: </Typography>
                <Typography paragraph align="center"> The content for this learning module was adapted from: </Typography>
                <Typography paragraph align="center"> The content for this learning module was adapted from: </Typography>
                
            </Paper>   
        </Grid> 
    );
};

export default Final;