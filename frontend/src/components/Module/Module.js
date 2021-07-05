import React from 'react';
import { AppBar, Typography, Button, Toolbar, Checkbox, FormControlLabel} from '@material-ui/core';
import HeaderBar from '../HeaderBar/HeaderBar.js';
import useStyles from './styles.js';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import TextInstructions from './TextInstructions/TextInstructions.js';
import MultipleChoice from './MultipleChoice/MultipleChoice.js';
import VideoInstructions from './VideoInstructions/VideoInstructions.js';
import CodingExercise from './CodingExercise/CodingExercise.js';
import { useHistory } from "react-router-dom";

const Module = () => {
    const classes = useStyles();

    const theme = useTheme();
    const history = useHistory();

    const [moduleType, setType] = React.useState("");
    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const NextPage = () =>{ 
        const user = document.getElementById("userId").value;
        localStorage.setItem('userId', user);
        console.log(user);
        let path = `module`; 
        history.push(path);
    }

    const PreviousPage = () =>{ 
        const user = document.getElementById("userId").value;
        localStorage.setItem('userId', user);
        console.log(user);
        let path = `module`; 
        history.push(path);
    }

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
                        <FormControlLabel control={<Checkbox name="checkedC" />} label="Part 1" />
                        <FormControlLabel control={<Checkbox name="checkedC" />} label="Part 2" />
                        <FormControlLabel control={<Checkbox name="checkedC" />} label="Part 3" />
                    </div>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.buttonGroup}>
                        <Button variant="contained" color="primary" className={classes.progressButton}> Previous </Button>
                        <Button variant="contained" color="primary" className={classes.progressButton}> Next </Button>
                    </div>
                    <TextInstructions/>
                </main>
            </div>
            
        </div>
    );
};

export default Module;