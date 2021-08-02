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
import { useParams, Link, withRouter } from "react-router-dom";

const Module = (props) => {

    const classes = useStyles();
    
    const [moduleTitles,setTitles] = React.useState([]);
    const [moduleType, setType] = React.useState(null);


    const [currentModule,setModuleVal] = React.useState(useParams().questionNumber);

    const [prevPage,setPrev] = React.useState("");
    const [nextPage,setNext] = React.useState("");

    const [moduleInfo, setModuleInfo] = React.useState("");



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
        
    },[currentModule]);

    async function getCurrentModule() {

        const url = `http://127.0.0.1:5000/module/${currentModule}`;
        let res = await fetch(url);
        res = await res.json();
        console.log(res);
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
        const url = 'http://127.0.0.1:5000/module';
        let res = await fetch(url);
        res = await res.json();
        console.log(res);
        const mod = [];
        res.forEach(m => {
            mod.push({title:m.pageTitle, viewed:false,id:m.questionNumber});
        });
        setTitles(mod);
        return res;
    }

    const moduleNames = moduleTitles.map((m) => <Link to={ '/module/' + m.id } key={m.id} className={classes.navLinks}><Typography paragraph><FormControlLabel id={m.id} control={<Checkbox checked={m.viewed || false} name="checkedC"/>} /> {m.title} </Typography></Link>);


    

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
                        <Link to={prevPage}>
                            <Button variant="contained" color="primary" className={classes.progressButton}>Prev</Button>
                        </Link>
                        <Link to={nextPage}>
                            <Button variant="contained" color="primary" className={classes.progressButton}>Next</Button>
                        </Link>
                    </div>
                    {moduleType}
                </main>
            </div>
            
        </div>
    );
};

export default withRouter(Module);