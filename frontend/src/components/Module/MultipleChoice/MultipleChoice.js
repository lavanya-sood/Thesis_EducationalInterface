import React from 'react';
import { Typography, Button, FormControl, FormLabel, RadioGroup, Radio,FormControlLabel, FormHelperText } from '@material-ui/core';
import useStyles from './styles.js';
import Alert from '@material-ui/lab/Alert';


const MultipleChoice = ({moduleInfo, allowNext}) => {
    const classes = useStyles();
    //const [answerStatus, setStatus] = React.useState("");
    const [value, setValue] = React.useState('');

    const [pageTitle,setPageTile] = React.useState(""); 
    const [question,setQuestion] = React.useState(""); 
    const [questionNumber,setQuestionNumber] = React.useState(""); 
    const [answerOptions,setOptions] = React.useState([]); 
    const [correctAnswer,setAnswer] = React.useState(""); 

    const [error,setError] = React.useState(false);
    const [success,setSuccess] = React.useState(false);
    const [answerStatus,setStatus] = React.useState("");

    const [attempts,setAttempts] = React.useState(1);

    const [seconds, setSeconds] = React.useState(0);
    const [isActive, setIsActive] = React.useState(false);
    const countRef = React.useRef(null);

    const [doneQuestion, setDone] = React.useState(false);

    React.useEffect(() => {
        console.log(moduleInfo);
        setPageTile(moduleInfo.pageTitle);
        setQuestion(moduleInfo.textDescription);
        setQuestionNumber(moduleInfo.questionNumber);
        setAnswer(moduleInfo.correctAnswer);

        console.log(moduleInfo.answerOptions);
        const vals = moduleInfo.answerOptions.split(" || ");
        console.log(vals);
        setOptions(vals);

        //console.log(moduleInfo);
        //console.log(allowNext);

        //console.log(props);

        //handleNextButton(true);
        countRef.current = setInterval(() => {
            setSeconds((seconds) => seconds + 1)
        }, 1000);

        let pages = [];
        if (JSON.parse(localStorage.getItem("pages")) != null) {
            pages = JSON.parse(localStorage.getItem("pages"))
            console.log(pages);
        } 

        console.log("ASAAAAAAAAAAA");
    
        if (!pages.includes(parseInt(moduleInfo.questionNumber))) {
            localStorage.setItem('currentExercise',moduleInfo.questionNumber);
        } else  {
            console.log("hER <<----");
            setDone(true);
            clearInterval(countRef.current);
        }

    },[moduleInfo]);

    const handleRadioChange = (event) => {
        setValue(event.target.value);
    };

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

    const checkAnswer = (e) => {
        e.preventDefault();
        console.log(value);
        if (value === correctAnswer) {
            setError(false);
            setSuccess(true);
            setStatus("You got it correct");
            allowNext();
            
            let pages = [];
            if (JSON.parse(localStorage.getItem("pages")) != null) {
              pages = JSON.parse(localStorage.getItem("pages"))
              console.log(pages);
            } 
      
            if (!pages.includes(questionNumber)) {
              pages.push(questionNumber);
              //console.log(moduleInfo.questionNumber);
            }
            localStorage.setItem("pages", JSON.stringify(pages));
            localStorage.removeItem("currentExercise");

            clearInterval(countRef.current);

            addAnswer();

        } else {
            setError(true);
            setSuccess(false);
            setAttempts(attempts+1);
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
            {error ? <Alert severity='error'>{answerStatus}</Alert> : <div></div> }
            {success ? <Alert severity='success'>{answerStatus}</Alert> : <div></div> }
        </div>
    );
};

export default MultipleChoice;