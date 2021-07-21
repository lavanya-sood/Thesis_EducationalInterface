import React from 'react';
import { Button, Toolbar, Checkbox, FormControlLabel} from '@material-ui/core';
import HeaderBar from '../HeaderBar/HeaderBar.js';
import useStyles from './styles.js';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MultipleChoice from './MultipleChoice/MultipleChoice.js';
import CodingExercise from './CodingExercise/CodingExercise.js';
import Instructions from './Instructions/Instructions.js';
import { Redirect, useHistory, useParams ,Link } from "react-router-dom";
import {getOneModule} from '../../actions/questionModule';

import { useSelector,useDispatch } from 'react-redux';

//const Module = ({moduleNumber, setNumber}) => {
const Module = () => {

    const dispatch = useDispatch();
    const [moduleTitles,setTitles] = React.useState([]);
    const [moduleType, setType] = React.useState("");
    //const [moduleNumber, setNumber] = React.useState(0);
    const currentModule = useParams().questionNumber;

    const [moduleNext, setNext] = React.useState(-1);

    const prev = parseInt(currentModule) - 1;
    const prevPage = `/module/${prev}`;

    const next = parseInt(currentModule) + 1;
    const nextPage = `/module/${next}`;


    
    const [modulePrev, setPrev] = React.useState(-1);

    //const moduleTitles = [];
    const modules = useSelector((state)=> state.questionModule);

    //const moduleInfo = useSelector((state)=> currentModule ? state.questionModule.find((m) => m.questionNumber === currentModule):null);

    //console.log(moduleInfo);
    //setNumber(useParams().questionNumber);
    const mod = useSelector((state)=> state.questionModule);
    const [moduleInfo, setModuleInfo] = React.useState(mod);

    React.useEffect(() => {
        const mod = []
        console.log(modules);
        setTitles(mod);
    },[modules]);



    //const modules2 = useSelector((state)=> state.questionModule);

    //console.log(moduleTitles);
    //console.log(moduleNumber);

    const moduleNames = moduleTitles.map((m) => <FormControlLabel key={m.id} id={m.id} control={<Checkbox checked={m.viewed || false} name="checkedC"/>} label={m.title} />);

    const classes = useStyles();

    //const theme = useTheme();
    const history = useHistory();

    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const NextPage = () =>{ 
        // const nextNum = moduleNumber + 1;
        // let path = `${nextNum}`; 
        // history.push(path);
        const next = currentModule + 1;
        const nextPage = `/module/${next}`;

        
    }

    const PreviousPage = () =>{ 
        // const prevNum = moduleNumber - 1;
        // let path = `${prevNum}`; 
        // history.push(path);
        const prev = currentModule - 1;
        const prevPage = `/module/${prev}`;
    }


    return (
        <div>
                <main className={classes.content}>
                    <div className={classes.buttonGroup}>
                        <Button variant="contained" color="primary" className={classes.progressButton} component={Link} to={prevPage}> Previous </Button>
                        <Button variant="contained" color="primary" className={classes.progressButton} component={Link} to={nextPage}> Next </Button>
                    </div>
                    {/* <p> {moduleNumber} </p> */}
                    <CodingExercise/>
                    {/* <Instructions /> */}
                    {/* <MultipleChoice /> */}
                </main>

            
        </div>
    );
};

export default Module;