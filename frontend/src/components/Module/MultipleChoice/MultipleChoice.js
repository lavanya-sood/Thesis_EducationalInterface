import React from 'react';
import { Typography, Button, FormControl, FormLabel, RadioGroup, Radio,FormControlLabel } from '@material-ui/core';
import useStyles from './styles.js';
import Alert from '@material-ui/lab/Alert';


const MultipleChoice = ({moduleInfo, allowNext}) => {
    const classes = useStyles();
    
    // value user selects
    const [value, setValue] = React.useState('');

    // page details
    const [pageTitle,setPageTile] = React.useState(""); 
    const [question,setQuestion] = React.useState(""); 
    const [questionNumber,setQuestionNumber] = React.useState(""); 
    const [answerOptions,setOptions] = React.useState([]); 
    const [correctAnswer,setAnswer] = React.useState(""); 

    // answer status
    const [error,setError] = React.useState(false);
    const [success,setSuccess] = React.useState(false);
    const [answerStatus,setStatus] = React.useState("");

    // number of attempts
    const [attempts,setAttempts] = React.useState(1);

    // time
    const [seconds, setSeconds] = React.useState(0);
    const countRef = React.useRef(null);

    const [doneQuestion, setDone] = React.useState(false);

    React.useEffect(() => {
        console.log(moduleInfo);
        
        // set the page details
        setPageTile(moduleInfo.pageTitle);
        setQuestion(moduleInfo.textDescription);
        setQuestionNumber(moduleInfo.questionNumber);
        setAnswer(moduleInfo.correctAnswer);

        // split the values from database and make separate options
        const vals = moduleInfo.answerOptions.split(" || ");
        
        for (let i = vals.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [vals[i], vals[j]] = [vals[j], vals[i]];
        }

        setOptions(vals);

        // set the timeout in seconds
        countRef.current = setInterval(() => {
            setSeconds((seconds) => seconds + 1)
        }, 1000);

        // get the user progress
        let pages = [];
        if (JSON.parse(localStorage.getItem("pages")) != null) {
            pages = JSON.parse(localStorage.getItem("pages"))
            console.log(pages);
        } 

        // check if the page is already done
        if (!pages.includes(parseInt(moduleInfo.questionNumber))) {
            localStorage.setItem('currentExercise',moduleInfo.questionNumber);
        } else  {
            setDone(true);
            clearInterval(countRef.current);
        }

        // check if time is already saved
        if ( localStorage.getItem('currentTime') != null && localStorage.getItem("currentExercise") != null && parseInt(localStorage.getItem("currentExercise")) === parseInt(moduleInfo.questionNumber)) {
            setSeconds(parseInt(localStorage.getItem('currentTime')));
        }

    },[moduleInfo]);

    // handle change of selected button
    const handleRadioChange = (event) => {
        setValue(event.target.value);
    };


    // function adds the users answer to the database
    async function addAnswer() {
        
        const data = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify( {
              userId: localStorage.getItem('userId'),
              questionNumber: questionNumber,
              timeSpent: seconds,
              attemptCount: attempts,
              attempt: value,
              gaveUp: 0,
            } )
        };

        console.log(data);
        
        const url = 'http://127.0.0.1:5000/answers';
        let res = await fetch(url, data);
        res = await res.json();
        console.log(res);
    }

    // function checks the user answer is correct
    const checkAnswer = (e) => {
        e.preventDefault();

        // if the user answer is correct
        if (value === correctAnswer) {
            setError(false);
            setSuccess(true);
            setStatus("You got it correct");
            allowNext();
            
            let pages = [];
            if (JSON.parse(localStorage.getItem("pages")) != null) {
              pages = JSON.parse(localStorage.getItem("pages"))
            } 
      
            if (!pages.includes(questionNumber)) {
              pages.push(questionNumber);
            }

            localStorage.setItem("pages", JSON.stringify(pages));
            localStorage.removeItem("currentExercise");
            localStorage.removeItem('currentTime');

            clearInterval(countRef.current);

            addAnswer();

        // if the answer is wrong
        } else {
            setError(true);
            setSuccess(false);
            setAttempts(attempts+1);
            localStorage.setItem('currentTime',seconds);
            setStatus("You selected the wrong answer. Try again.");
        }
    };
    
    const answerSelection = answerOptions.map((a) => <FormControlLabel key={a} value={a} control={<Radio />} label={a} /> );

    return (
        <div className={classes.textInstructions}>
            <div className={classes.timerDiv}>
                <Typography p className={classes.timeText}> {seconds} seconds </Typography>
            </div>

            <Typography variant="h4"> {pageTitle} </Typography>
            <br/>
            
            <br/>
            <form onSubmit={checkAnswer}>
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">{question}</FormLabel>
                    <RadioGroup aria-label="quiz" name="quiz" value={value} onChange={handleRadioChange}>
                        {answerSelection}
                    </RadioGroup>

                    <br/>
                    <Button type="submit" variant="contained" color="secondary" className={classes.button}>
                    Check Answer
                    </Button>
                </FormControl>
            </form>
            <br/>
            {!doneQuestion && error ? <Alert severity='error'>{answerStatus}</Alert> : <div></div> }
            {!doneQuestion && success ? <Alert severity='success'>{answerStatus}</Alert> : <div></div> }
            {doneQuestion && !success ? <Alert severity='success'>Already done</Alert> : <div></div> }
        </div>
    );
};

export default MultipleChoice;