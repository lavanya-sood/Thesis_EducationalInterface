import React from 'react';
import useStyles from './styles.js';
import './style.css';


const TextInstructions = (textDescription) => {
    const classes = useStyles();

    const val = textDescription.textDescription;

    console.log(textDescription);

    return (
        <div className={classes.textInstructions} dangerouslySetInnerHTML={{__html: val}} />
    );
};

export default TextInstructions;