import React from 'react';
import HeaderBar from '../HeaderBar/HeaderBar.js';
import { AppBar, Typography, Button, Toolbar, Container, TextField} from '@material-ui/core';
import useStyles from './styles.js';

const Landing = () => {
    const classes = useStyles();
    return (
        <Container maxWidth='lg' className={classes.outsideContainer}>
            <Typography variant="h1"> Introduction to Hypertext Markup Language</Typography>
            <Container maxWidth='md'>
                <Typography variant="h4"> Enter Login Code </Typography>
                <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                <Button variant="contained" color="primary"> Start Module </Button>
            </Container>
        </Container>
    );
};

export default Landing;