import React from 'react';
import { Paper ,Typography, Button,Grid, TextField} from '@material-ui/core';
import useStyles from './styles.js';
import { useHistory } from "react-router-dom";

const Final = () => {
    const classes = useStyles();

    React.useEffect(() => {
        let pages = [];
        if (JSON.parse(localStorage.getItem("pages")) != null) {
            pages = JSON.parse(localStorage.getItem("pages"))
            console.log(pages);
        } 

        const data = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify( {
              userId: localStorage.getItem('userId'),
              navOrder: pages,
            } )
        };

        console.log(data);
        
        const submitNav = async () => {
            const url = 'http://127.0.0.1:5000/navigation';
            let res = await fetch(url, data);
            res = await res.json();
            console.log(res);
        };

        submitNav();
        
    },[]);

    // async function addAnswer() {
        
        
    // }

    return (
        <Grid container spacing={0} direction="column" alignItems="center" justify="center" className={classes.outsideContainer}>
            <Typography className={classes.heading} variant="h3" align="center"> Thank you for your participation! </Typography>
            <Paper className={classes.insideContainer}>
                <Typography variant="h5" align="center"> The content for this learning module was adapted from: </Typography>
                <Typography paragraph align="center"> Foster, Jo 2018, HTML 101: The Essential Beginner's Guide to Learning HTML Coding </Typography>
                <Typography paragraph align="center"> Sanders, Bill 2011. Smashing HTML5 (1st. ed.). Wiley Publishing. </Typography>
                <Typography paragraph align="center"> Brooks, DR 2007, An Introduction to HTML and JavaScript : for Scientists and Engineers, Springer London, London. </Typography>
                <Typography paragraph align="center"> Krause, J 2016, Introducing Web Development, Apress : Imprint: Apress, Berkeley, CA. </Typography>
            </Paper>   
        </Grid> 
    );
};

export default Final;