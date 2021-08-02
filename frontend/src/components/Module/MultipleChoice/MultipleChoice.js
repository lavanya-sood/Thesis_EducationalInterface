import React from 'react';
import { Typography, Button, FormControl, FormLabel, RadioGroup, Radio,FormControlLabel, FormHelperText } from '@material-ui/core';
import useStyles from './styles.js';


const MultipleChoice = (moduleInfo) => {
    const classes = useStyles();
    const [answerStatus, setStatus] = React.useState("");
    const [value, setValue] = React.useState('');

    const [pageTitle,setPageTile] = React.useState(""); 
    const [question,setQuestion] = React.useState(""); 
    const [questionNumber,setQuestionNumber] = React.useState(""); 
    const [answerOptions,setOptions] = React.useState([]); 
    const [correctAnswer,setAnswer] = React.useState(""); 

    React.useEffect(() => {
        console.log(moduleInfo.moduleInfo);
        setPageTile(moduleInfo.moduleInfo.pageTitle);
        setQuestion(moduleInfo.moduleInfo.textDescription);
        setQuestionNumber(moduleInfo.moduleInfo.questionNumber);
        setAnswer(moduleInfo.moduleInfo.correctAnswer);

        console.log(moduleInfo.moduleInfo.answerOptions);
        const vals = moduleInfo.moduleInfo.answerOptions.split(" || ");
        console.log(vals);
        setOptions(vals);

    },[moduleInfo]);

    const handleRadioChange = (event) => {
        setValue(event.target.value);
        setStatus(' ');
      };

    const checkAnswer = (e) => {
        e.preventDefault();
        console.log(value);
        if (value === correctAnswer) {
            setStatus('You got it!');
        } else {
            setStatus('Sorry, wrong answer!');
        }
    };
    
    
    const answerSelection = answerOptions.map((a) => <FormControlLabel key={a} value={a} control={<Radio />} label={a} /> );

    return (
        <div className={classes.textInstructions}>
            <Typography variant="h4"> {pageTitle} </Typography>
            <br/>
            <br/>
            <form onSubmit={checkAnswer}>
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">{question}</FormLabel>
                    <RadioGroup aria-label="quiz" name="quiz" value={value} onChange={handleRadioChange}>
                    {/* <FormControlLabel value="best" control={<Radio />} label="Answer A" />
                    <FormControlLabel value="worst" control={<Radio />} label="Answer B" />
                    <FormControlLabel value="worst3" control={<Radio />} label="Answer C" />
                    <FormControlLabel value="worst4" control={<Radio />} label="Answer D" /> */}
                        {answerSelection}
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