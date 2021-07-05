import React from 'react';
import { AppBar, Typography, Button, Toolbar} from '@material-ui/core';
import './styles.js';


const HeaderBar = () => {

    const [userId, setUserId] = React.useState("");

    React.useEffect(() => {
        setUserId(localStorage.getItem('userId'));
    }, []);

    return (
        <div>
            <AppBar position='sticky' color='primary'>
                <Toolbar>
                    <Typography variant="h6"> Introduction to HTML</Typography>
                    <Button color="inherit">Welcome, {userId}</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default HeaderBar;