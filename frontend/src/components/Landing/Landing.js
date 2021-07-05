import React from 'react';
import HeaderBar from '../HeaderBar/HeaderBar.js';
import { AppBar,Paper ,Typography, Button, Toolbar,Grid, Container, TextField} from '@material-ui/core';
import useStyles from './styles.js';

const Landing = () => {
    const classes = useStyles();
    return (
        <Grid container spacing={0} direction="column" alignItems="center" justify="center" className={classes.outsideContainer}>
            <Typography className={classes.heading} variant="h2" align="center"> Introduction to Hypertext Markup Language</Typography>
            <Paper className={classes.insideContainer}>
                <Typography variant="h4" align="center"> Enter Login Code </Typography>
                <TextField id="outlined-basic" label="Enter Code" variant="outlined" className={classes.textBoxCode} />
                <Button variant="contained" color="primary" className={classes.startButton}> Start Module </Button>
            </Paper>   
        </Grid> 
    );
};

export default Landing;