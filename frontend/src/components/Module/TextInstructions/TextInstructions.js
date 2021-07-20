import React from 'react';
import { AppBar,Paper ,Typography, Button, Toolbar,Grid, Container, TextField} from '@material-ui/core';
import useStyles from './styles.js';
import { Markup } from 'interweave';


const TextInstructions = () => {
    const classes = useStyles();
    const val = "Headings are the title that you put on an HTML page in order to break up sections on a page.<br/> A Heading Element as both an opening and a closing tag and the text in placed inside the tags. For example: <br/><span style='background-color: #d7ecf7; padding-left: 2px; padding-right: 2px; border-radius: 5px; border:1px solid #b0e4ff ;'> &lt;h1&gt; Introduction &lt;/h1&gt;<br/></span> There are six Heading Elements in HTML which all have a different size and a different level of hierarchy on the page ranging from <span style='background-color: #d7ecf7; padding-left: 2px; padding-right: 2px; border-radius: 5px; border:1px solid #b0e4ff ;'> &lt;h1&gt;</span> to <span style='background-color: #d7ecf7; padding-left: 2px; padding-right: 2px; border-radius: 5px; border:1px solid #b0e4ff ;'> &lt;h6&gt;</span> . <br/> The biggest size is the <span style='background-color: #d7ecf7; padding-left: 2px; padding-right: 2px; border-radius: 5px; border:1px solid #b0e4ff ;'> &lt;h1&gt;</span>  tag and the smallest in size in the <span style='background-color: #d7ecf7; padding-left: 2px; padding-right: 2px; border-radius: 5px; border:1px solid #b0e4ff ;'> &lt;h6&gt;</span>  tag. The heading tag that you choose depends on how big and where you want the Headings to appear on the page. <br/> If you are creating the page title you might use <span style='background-color: #d7ecf7; padding-left: 2px; padding-right: 2px; border-radius: 5px; border:1px solid #b0e4ff ;'> &lt;h1&gt;</span>  but if you are writing a subsection on the page after the heading, you can use any of the smaller tags.";
    

    return (
        <div className={classes.textInstructions}>
            <Typography paragraph>
                <Markup content={val} /> 
            </Typography>
        </div>
    );
};

export default TextInstructions;