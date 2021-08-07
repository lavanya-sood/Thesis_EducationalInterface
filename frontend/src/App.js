import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import themes from './styles.js';

// the three main web components
import Landing from './components/Landing/Landing.js';
import Module from './components/Module/Module.js';
import Final from './components/Final/Final.js';

const App = () => {
    return (
        // set the theme for the website
        <ThemeProvider theme={themes}>
            <BrowserRouter>
                <Switch>
                    <Route path="/module/:questionNumber" component={props => (<Module key={props.location.key} {...props}/>)}/>
                    <Route exact path="/endScreen" component={Final}/>
                    <Route exact path="/" component={Landing}/>
                </Switch>
            </BrowserRouter>
        </ThemeProvider>
    );
};

export default App;