import React from 'react';
import { Typography, Button, FormControl, FormLabel, RadioGroup, Radio,FormControlLabel, FormHelperText } from '@material-ui/core';
import useStyles from './styles.js';


const MultipleChoice = () => {
    const classes = useStyles();
    const [answerStatus, setStatus] = React.useState("");
    const [value, setValue] = React.useState('');

    const handleRadioChange = (event) => {
        setValue(event.target.value);
        setStatus(' ');
      };

    const checkAnswer = (e) => {
        e.preventDefault();

        if (value === 'best') {
            setStatus('You got it!');
        } else if (value === 'worst') {
            setStatus('Sorry, wrong answer!');
        } else if (value === 'worst3') {
            setStatus('Sorry, wrong answer!');
        } else if (value === 'worst4') {
            setStatus('Sorry, wrong answer!');
        } else {
            setStatus('Please select an option.');
        }
    };
    

    return (
        <div className={classes.textInstructions}>
            <Typography variant="h4"> Hello World </Typography>
            <br/>
            <br/>
            <form onSubmit={checkAnswer}>
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">Which is the correct question?</FormLabel>
                    <RadioGroup aria-label="quiz" name="quiz" value={value} onChange={handleRadioChange}>
                    <FormControlLabel value="best" control={<Radio />} label="Answer A" />
                    <FormControlLabel value="worst" control={<Radio />} label="Answer B" />
                    <FormControlLabel value="worst3" control={<Radio />} label="Answer C" />
                    <FormControlLabel value="worst4" control={<Radio />} label="Answer D" />
                    </RadioGroup>
                    <FormHelperText>{answerStatus}</FormHelperText>
                    <br/>
                    <Button type="submit" variant="contained" color="secondary" className={classes.button}>
                    Check Answer
                    </Button>
                </FormControl>
            </form>
        </div>
    );
};

export default MultipleChoice;