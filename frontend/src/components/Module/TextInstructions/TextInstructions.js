import React from 'react';
import { AppBar,Paper ,Typography, Button, Toolbar,Grid, Container, TextField} from '@material-ui/core';
import useStyles from './styles.js';
import { useHistory } from "react-router-dom";

const TextInstructions = () => {
    const classes = useStyles();

    const history = useHistory();

    const NextPage = () =>{ 
        const user = document.getElementById("userId").value;
        localStorage.setItem('userId', user);
        console.log(user);
        let path = `module`; 
        history.push(path);
    }

    const PreviousPage = () =>{ 
        const user = document.getElementById("userId").value;
        localStorage.setItem('userId', user);
        console.log(user);
        let path = `module`; 
        history.push(path);
    }

    return (
        <div className={classes.textInstructions}>
            <Typography variant="h4"> Hello World </Typography>
            <br/>
            <Typography paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
                facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
                gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id
                donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
                adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras.
                Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis
                imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
                arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
                donec massa sapien faucibus et molestie ac.
            </Typography>
        </div>
    );
};

export default TextInstructions;