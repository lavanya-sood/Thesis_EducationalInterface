import React from 'react';
import HeaderBar from '../HeaderBar/HeaderBar.js';
import { AppBar,Paper ,Typography, Button, Toolbar,Grid, Container, TextField} from '@material-ui/core';
import useStyles from './styles.js';
import { useHistory } from "react-router-dom";

const Landing = () => {
    const classes = useStyles();

    const history = useHistory();

    const routeChange = () =>{ 
        const user = document.getElementById("userId").value;
        localStorage.setItem('userId', user);
        console.log(user);
        let path = `module`; 
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