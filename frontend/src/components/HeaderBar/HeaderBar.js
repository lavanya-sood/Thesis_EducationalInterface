import React from 'react';
import { AppBar, Typography, Toolbar} from '@material-ui/core';
import useStyles from './styles.js';


const HeaderBar = () => {
    const classes = useStyles();
    const [userId, setUserId] = React.useState("");

    React.useEffect(() => {
        setUserId(localStorage.getItem('userId'));
    }, []);

    return (
        <div>
            <AppBar position='sticky' color='primary' className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" className={classes.headingappBar}> Introduction to HTML</Typography>
                    <Typography variant="body1" className={classes.welcomeInfo}> Welcome, {userId} </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default HeaderBar;