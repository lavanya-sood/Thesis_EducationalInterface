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
import FinalExercise from './CodingExercise/FinalExercise.js';
import Instructions from './Instructions/Instructions.js';
import { useParams, Link, withRouter } from "react-router-dom";
import LinearProgress from '@material-ui/core/LinearProgress';
import Box from '@material-ui/core/Box';

const Module = (props) => {

    const classes = useStyles();

    const [moduleTitles,setTitles] = React.useState([]);
    const [moduleType, setType] = React.useState(null);

    const [progress, setProgress] = React.useState(0);
    
    // number of the module
    //const [currentModule,setModuleVal] = React.useState(useParams().questionNumber);
    const currentModule = useParams().questionNumber;
    
    // the link for the previous and next page.
    const [prevPage,setPrev] = React.useState("");
    const [nextPage,setNext] = React.useState("");
    
    // information about the module
    //const [moduleInfo, setModuleInfo] = React.useState("");
    
    //check the module status
    const [firstQuestion, setFirstQuestion] = React.useState(false);
    const [lastQuestion, setLastQuestion] = React.useState(false);
    const [nextButton, setNextButton] = React.useState(false);
    



    React.useEffect(()=> {
        
        getAllModules();
        getCurrentModule();

        // set the previous link
        const prev = parseInt(currentModule) - 1;
        const prevLink = `/module/${prev}`;
        setPrev(prevLink);
    
        // set the next link
        const next = parseInt(currentModule) + 1;
        const nextLink = `/module/${next}`;
        setNext(nextLink);

        // get the list of pages that the user has already completed
        let pagesOrder = [];
        if (JSON.parse(localStorage.getItem("pagesOrder")) != null) {
            pagesOrder = JSON.parse(localStorage.getItem("pagesOrder"))
        } 
        pagesOrder.push(parseInt(currentModule));
        localStorage.setItem("pagesOrder", JSON.stringify(pagesOrder));

        // get the list of pages that the user has already completed
        let pages = [];
        if (JSON.parse(localStorage.getItem("pages")) != null) {
            pages = JSON.parse(localStorage.getItem("pages"))
        } 

        // if the page was already completed 
        if (pages.includes(parseInt(currentModule))) {
            setNextButton(true);
        }        
    },[currentModule]);

    const handleNextButton = () => {
        setNextButton(true);
    }

    // get the information about the current module
    async function getCurrentModule() {

        // get information from backend
        const url = `http://127.0.0.1:5000/module/${currentModule}`;
        let res = await fetch(url);
        res = await res.json();
        console.log(res);
        //setModuleInfo(res[0]);

        // if the module is instructions
        if (res[0].questionType === 'instructions'){
            setNextButton(true);
            setType(<Instructions moduleInfo={res[0]} />);
        
        // if the module is a coding exercise
        } else if (res[0].questionType === 'coding'){
            
            // if it's the final question
            if (res[0].questionNumber === 25) {
                setType(<FinalExercise moduleInfo={res[0]} allowNext={handleNextButton} />);
            
            // otherwise render the normal coding compoenent
            } else {
                setType(<CodingExercise moduleInfo={res[0]} allowNext={handleNextButton} />);
            } 
        
        // if the question is a multiple chocie question 
        } else if (res[0].questionType === 'multipleChoice'){
            setType(<MultipleChoice moduleInfo={res[0]} allowNext={handleNextButton} />);
        }

        // if it's the first question
        if (res[0].questionNumber === 1) {
            setFirstQuestion(true);
            setLastQuestion(false);
        // if it's the last question
        } else if (res[0].questionNumber === 25) {
            setFirstQuestion(false);
            setLastQuestion(true);
        // otherwise
        } else {
            setFirstQuestion(false);
            setLastQuestion(false);
        }
 
        return res;
    }

    
    // get information about all the module
    async function getAllModules() {
        
        // request information from backend 
        const url = 'http://127.0.0.1:5000/module';
        let res = await fetch(url);
        res = await res.json();
        console.log(res);
        const mod = [];

        // get the information about the pages that the user has completed from local storage 
        const pages = JSON.parse(localStorage.getItem("pages"));
        console.log(pages);
        res.forEach(m => {
            let val = {
                title:m.pageTitle, 
                viewed:false,
                id:m.questionNumber
            };
            // if the page has already been completed by the user 
            if (pages != null && pages.includes(m.questionNumber)) {
                val.viewed = true;
            }
            mod.push(val);
        });

        if (pages != null && pages.length > 0) {
            setProgress(pages.length/25 * 100);
        } else {
            setProgress(0);
        }

        setTitles(mod);
        return res;
    }

    // create the table of contents 
    const moduleNames = moduleTitles.map((m) =>  <Link to={ m.viewed || m.id === parseInt(localStorage.getItem("currentExercise")) ? '/module/' + m.id : '/module/' + currentModule} key={m.id} className= { m.id === parseInt(currentModule) ? classes.navCurrent : m.viewed || m.id === parseInt(localStorage.getItem("currentExercise")) ? classes.navLinks : classes.navLinksDisabled }><Typography paragraph><FormControlLabel id={m.id} control={<Checkbox checked={m.viewed || false} name="checkedC"/>} /> {m.title} </Typography></Link>);

    
    // Open the table of contents 
    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

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
                        <div className={clsx( {
                        [classes.hide]: !open,
                        })}>
                            <Typography variant="h6" className={classes.headingPr}> Overall Progress </Typography>
                            <div className={classes.progressBar}>
                                <Box display="flex" alignItems="center">
                                    <Box width="100%" mr={1}>
                                        <LinearProgress variant="determinate" value={progress} />
                                    </Box>
                                    <Box minWidth={15}>
                                        <Typography variant="body2" color="textSecondary">{`${Math.round(
                                        progress,
                                        )}%`}</Typography>
                                    </Box>
                                </Box>
                            </div>
                        </div>
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
                        {moduleNames}
                    </div>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.buttonGroup}>
                        {!firstQuestion ? 
                            <Link to={prevPage} className={classes.linkButton}>
                                <Button variant="contained" color="primary" className={classes.progressButton}>Prev</Button>
                            </Link>
                            : <div></div> 
                        }
                        
                        {!nextButton? <div></div>  : <></> }
                        {lastQuestion && nextButton && !firstQuestion?
                            <Link to='/endScreen' className={classes.linkButton}>
                                <Button variant="contained" color="primary" className={classes.progressButton}>Finish</Button>
                            </Link>
                            : <></> 
                        }
                        {nextButton && !lastQuestion ?
                            <Link to={nextPage} className={classes.linkButton}>
                                <Button variant="contained" color="primary" className={classes.progressButton}>Next</Button>
                            </Link>
                            : <></> 
                        }
                        
                    </div>
                    {moduleType}
                </main>
            </div>
            
        </div>
    );
};

export default withRouter(Module);