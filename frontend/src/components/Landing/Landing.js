import React from 'react';
import { Paper ,Typography, Button,Grid, TextField} from '@material-ui/core';
import useStyles from './styles.js';
import { useHistory } from "react-router-dom";

// first page the user sees
const Landing = () => {
    const classes = useStyles();

    const history = useHistory();

    // changes the route
    const routeChange = () =>{ 
        
        // stores the userId in the local storage
        const user = document.getElementById("userId").value;
        localStorage.setItem('userId', user);
        console.log(user);
        
        // sets the path to the first module
        let path = `module/1`; 
        history.push(path);
    }

    return (
        <Grid container spacing={0} direction="column" alignItems="center" justify="center" className={classes.outsideContainer}>
            <Typography className={classes.heading} variant="h2" align="center"> Introduction to Hypertext Markup Language</Typography>
            <Paper className={classes.insideContainer}>
                <Typography variant="h4" align="center"> Enter Login Code </Typography>
                <TextField id="userId" label="Enter Code" variant="outlined" className={classes.textBoxCode} />
                <Button variant="contained" color="primary" onClick={routeChange} className={classes.startButton}> Start Module </Button>
            </Paper>   
        </Grid> 
    );
};

export default Landing;