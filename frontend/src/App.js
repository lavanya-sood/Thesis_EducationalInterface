import React from 'react';
import { AppBar, Typography, Button, Toolbar} from '@material-ui/core';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import themes from './styles.js';

import Landing from './components/Landing/Landing.js';
import Module from './components/Module/Module.js';

const App = () => {
    return (
        <ThemeProvider theme={themes}>
            <BrowserRouter>
                <Switch>
                <Route path="/module">
                    <Module />
                </Route>
                <Route exact path="/">
                    <Landing />
                </Route>
                </Switch>
            </BrowserRouter>
        </ThemeProvider>
    );
};

export default App;