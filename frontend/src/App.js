import React from 'react';
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import themes from './styles.js';
import {getModule} from './actions/questionModule';

import Landing from './components/Landing/Landing.js';
import Module from './components/Module/Module.js';

const App = () => {

    //const dispatch = useDispatch();

    const [moduleNumber,setNumber] = React.useState(1);

    // React.useEffect(()=> {
    //     dispatch(getModule());
    // },[dispatch]);

    return (
        <ThemeProvider theme={themes}>
            <BrowserRouter>
                <Switch>
                    <Route path="/module/:questionNumber" component={Module}/>
                        {/* <Module moduleNumber={moduleNumber} setNumber={setNumber}/> */}
                        {/* <Module/> */}
                    {/* </Route> */}
                    <Route exact path="/" component={Landing}/>
                        {/* <Landing /> */}
                    {/* </Route> */}
                </Switch>
            </BrowserRouter>
        </ThemeProvider>
    );
};

export default App;