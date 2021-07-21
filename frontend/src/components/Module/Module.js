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
import { Redirect, useHistory, useParams ,NavLink } from "react-router-dom";
import {getOneModule} from '../../actions/questionModule';
import ModuleContent from './ModuleContent.js';

import { useSelector,useDispatch } from 'react-redux';

//const Module = ({moduleNumber, setNumber}) => {
const Module = () => {

    const dispatch2 = useDispatch();
    const [moduleTitles,setTitles] = React.useState([]);
    const [moduleType, setType] = React.useState(null);
    //const [moduleNumber, setNumber] = React.useState(0);
    const currentModule = parseInt(useParams().questionNumber);

    // const prev = currentModule - 1;
    // const prevPage = `/module/${prev}`;

    //const [currentModule,setModuleVal] = React.useState(pasuseParams().questionNumber);

    //const [prevPage,setPrev] = React.useState(currentModule);
    //const [nextPage,setNext] = React.useState(currentModule);

    // const [moduleNext, setNext] = React.useState(-1);

    const prev = parseInt(currentModule) - 1;
    const prevPage = `/module/${prev}`;
    console.log(prevPage);

    const next = parseInt(currentModule) + 1;
    const nextPage = `/module/${next}`;
    console.log(nextPage);


    
    // const [modulePrev, setPrev] = React.useState(-1);

    //const moduleTitles = [];
    const modules = useSelector((state)=> state.questionModule);

    //const moduleInfo = useSelector((state)=> currentModule ? state.questionModule.find((m) => m.questionNumber === currentModule):null);

    //console.log(moduleInfo);
    //setNumber(useParams().questionNumber);
    const mod = useSelector((state)=> state.questionModule);
    const [moduleInfo, setModuleInfo] = React.useState(mod);

    // const distFunc = () => {
        
    //     setModuleInfo(useSelector((state)=> state.questionModule));
    // };

    React.useEffect(()=> {
        console.log("Here");
        
        async function getAllModules() {
            //const manufacturer = 'Manufacturer';
            const url = 'http://127.0.0.1:5000/module';
            let res = await fetch(url);
            res = await res.json();
            console.log(res);
            //console.log(res.map((m)=>))
            const mod = [];
            res.forEach(m => {
                mod.push({title:m.pageTitle, viewed:false,id:m.questionNumber});
            });
            //moduleTitles(res.map(val));
            setTitles(mod);
            return res;
        }

        async function getCurrentModule() {
            //const manufacturer = 'Manufacturer';
            const url = `http://127.0.0.1:5000/module/${currentModule}`;
            let res = await fetch(url);
            res = await res.json();
            console.log(res);
            //setType(res[0].questionType);
            setModuleInfo(res[0]);

            if (res[0].questionType === 'instructions'){
                setType(<Instructions module={moduleInfo} />);
            } else if (res[0].questionType === 'coding'){
                setType(<CodingExercise module={moduleInfo} />);
            } else if (res[0].questionType === 'multipleChoice'){
                setType(<MultipleChoice module={moduleInfo} />);
            }

            return res;
        }
        
        getAllModules();
        getCurrentModule();
        
        //dispatch2(getOneModule(currentModule));
        //setModuleInfo(useSelector((state)=> state.questionModule));
    },[]);




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
        console.log("Hey2");
        const next = currentModule + 1;
        //setNext(next);
        // const nextPage = `/module/${next}`;
        
    }

    const PreviousPage = () =>{ 
        // const prevNum = moduleNumber - 1;
        // let path = `${prevNum}`; 
        // history.push(path);
        console.log("Hey");
        const prev = currentModule - 1;
        //setPrev(prev);
        // const prevPage1 = `/module/${prev1}`;
    }

    // if (prevPage !== currentModule) {
    //     return <Redirect to={`/module/${prevPage}`} />;
    // }

    // if (nextPage !== currentModule) {
    //     console.log("CurrentMod == " + currentModule);
    //     console.log("Next == " + nextPage);
    //     return <Redirect to={`/module/${nextPage}`} />;
    // }


    return (
        <div>
            <HeaderBar />
            <div className={classes.root}>
                <Drawer variant="permanent"
                    className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                    })}
                    classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                    }}
                > 
                    
                    <Toolbar />
                    <div className={classes.toolbar}>
                        <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                        [classes.hide]: open,
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                    
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerClose}
                        edge="start"
                        className={clsx(classes.menuButton, {
                        [classes.hide]: !open,
                        })}
                    >
                        <ChevronLeftIcon />
                    </IconButton>
                    </div>
                    <Divider className={classes.divider}/>
                    <div 
                        className={clsx(classes.listModules, {
                            [classes.hide]: !open,
                        })}
                    >
                        {/* <FormControlLabel control={<Checkbox name="checkedC" />} label="Part 1" />
                        <FormControlLabel control={<Checkbox name="checkedC" />} label="Part 2" />
                        <FormControlLabel control={<Checkbox name="checkedC" />} label="Part 3" /> */}
                        {moduleNames}
                    </div>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.buttonGroup}>
                        {/* <Button variant="contained" color="primary" className={classes.progressButton} component={Link} to={prevPage}> Previous </Button> */}
                        <Button variant="contained" color="primary" className={classes.progressButton}> <NavLink name="prevPage" to={prevPage}>Previous</NavLink> </Button>
                        {/* <Button variant="contained" color="primary" className={classes.progressButton} component={Link} to={nextPage}> Next </Button> */}
                        <Button variant="contained" color="primary" className={classes.progressButton}> <NavLink name="prevPage" to={nextPage}>Next</NavLink> </Button>
                        
                    </div>
                    {/* <p> {moduleNumber} </p> */}
                    {/* <CodingExercise/> */}
                    {/* <Instructions module={moduleInfo} /> */}
                    {/* <MultipleChoice /> */}
                    {moduleType}
                </main>
            </div>
            
        </div>
    );
};

export default Module;