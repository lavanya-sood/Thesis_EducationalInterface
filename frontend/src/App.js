import React from 'react';
import { AppBar, Typography, Button, Toolbar} from '@material-ui/core';

const App = () => {
    return (
        <div>
            <AppBar position='sticky' color='primary'>
                <Toolbar>
                    <Typography variant="h6"> Introduction to HTML</Typography>
                    <Button color="inherit">Welcome, user</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default App;