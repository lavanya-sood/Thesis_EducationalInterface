import React from 'react';
import { Button, Toolbar, Checkbox, FormControlLabel, Typography} from '@material-ui/core';
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
import { Redirect, useHistory, useParams ,NavLink, Link, withRouter } from "react-router-dom";
import {getOneModule} from '../../actions/questionModule';
import ModuleContent from './ModuleContent.js';

import { useSelector,useDispatch } from 'react-redux';

//const Module = ({moduleNumber, setNumber}) => {
const Module = (props) => {

    const dispatch2 = useDispatch();
    const [moduleTitles,setTitles] = React.useState([]);
    const [moduleType, setType] = React.useState(null);
    //const [moduleNumber, setNumber] = React.useState(0);
    //const currentModule = parseInt(useParams().questionNumber);

    // const prev = currentModule - 1;
    // const prevPage = `/module/${prev}`;

    const [currentModule,setModuleVal] = React.useState(useParams().questionNumber);

    const [prevPage,setPrev] = React.useState("");
    const [nextPage,setNext] = React.useState("");

    //const [moduleNext, setNext] = React.useState(false);
    //const [modulePrev, setPrev] = React.useState(false);
    const [changePage, setChange] = React.useState(false);

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



    //   componentDidUpdate((prevProps) => {
    //     if (prevProps.match.params.type !== this.props.match.params.type) {
    //         console.log(prevProps.match.params);
    //       }
    // }, []);

    React.useEffect(()=> {
        console.log("Here");
 


        
        getAllModules();
        getCurrentModule();

        const prev = parseInt(currentModule) - 1;
        const prevLink = `/module/${prev}`;
        console.log(prevLink);
        setPrev(prevLink);
    

        const next = parseInt(currentModule) + 1;
        const nextLink = `/module/${next}`;
        console.log(nextLink);
        setNext(nextLink);
        
        
        //dispatch2(getOneModule(currentModule));
        //setModuleInfo(useSelector((state)=> state.questionModule));
    },[]);

    async function getCurrentModule() {
        //const manufacturer = 'Manufacturer';
        const url = `http://127.0.0.1:5000/module/${currentModule}`;
        let res = await fetch(url);
        res = await res.json();
        console.log(res);
        //setType(res[0].questionType);
        setModuleInfo(res[0]);

        if (res[0].questionType === 'instructions'){
            setType(<Instructions moduleInfo={res[0]} />);
        } else if (res[0].questionType === 'coding'){
            setType(<CodingExercise moduleInfo={res[0]} />);
        } else if (res[0].questionType === 'multipleChoice'){
            setType(<MultipleChoice moduleInfo={res[0]} />);
        }

        return res;
    }

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



    //console.log(moduleTitles);
    //console.log(moduleNumber);

    const moduleNames = moduleTitles.map((m) => <Link to={ '/module/' + m.id } key={m.id}><Typography paragraph><FormControlLabel id={m.id} control={<Checkbox checked={m.viewed || false} name="checkedC"/>} /> {m.title} </Typography></Link>);


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

    const updateModule = () => {
        getAllModules();
        getCurrentModule();
    }

    const NextPage = () =>{ 
        // const nextNum = moduleNumber + 1;
        // let path = `${nextNum}`; 
        // history.push(path);
        console.log("Hey2");
        const next = parseInt(currentModule) + 1;
        setModuleVal(next);
        console.log(next);
        setChange(true);
        updateModule();
        //setNext(next);
        // const nextPage = `/module/${next}`;
    }


    const PreviousPage = () =>{ 
        // const prevNum = moduleNumber - 1;
        // let path = `${prevNum}`; 
        // history.push(path);
        
        const prev = parseInt(currentModule) - 1;
        setModuleVal(prev);
        console.log(prev);
        console.log(currentModule);
        setChange(true);
        updateModule();
        //setPrev(prev);
        // const prevPage1 = `/module/${prev1}`;
    }

    if (changePage) {
        setChange(false);
        console.log("This called")
        return <Redirect to={`/module/${currentModule}`} />;
    }

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
                        <Link to={prevPage}>
                            <Button variant="contained" color="primary" className={classes.progressButton}>Prev</Button>
                        </Link>
                        <Link to={nextPage}>
                            <Button variant="contained" color="primary" className={classes.progressButton}>Next</Button>
                        </Link>
                        {/* <Button variant="contained" color="primary" className={classes.progressButton} component={Link} to={prevPage}> Previous </Button> */}
                        {/* <Button variant="contained" color="primary" className={classes.progressButton}> <NavLink name="prevPage" to={prevPage} >Previous</NavLink> </Button> */}
                        {/* <Button variant="contained" color="primary" className={classes.progressButton} component={Link} to={nextPage}> Next </Button> */}
                        {/* <Button variant="contained" color="primary" className={classes.progressButton}> <NavLink name="prevPage" to={nextPage}>Next</NavLink> </Button> */}
                        {/* <Button variant="contained" color="primary" className={classes.progressButton} component={Link} to={nextPage}> Next </Button> */}
                        {/* <Button variant="contained" color="primary" className={classes.progressButton}> <Link to={nextPage} onClick={() => window.location.reload()} className="btn btn-primary">Next</Link> </Button> */}
                        {/* <Button variant="contained" color="primary" onClick={PreviousPage} className={classes.progressButton}>Previous</Button> */}
                        {/* <Button variant="contained" color="primary" onClick={NextPage} className={classes.progressButton}>Next</Button> */}
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

export default withRouter(Module);