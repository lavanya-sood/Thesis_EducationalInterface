import React from 'react';
import useStyles from './styles.js';


const VideoInstructions = () => {
    const classes = useStyles();    

    return (
        <div className={classes.videoInstructions}>
            <div className={classes.videoPanel}>
                <video className={classes.videoBox}> </video>
            </div>
        </div>
    );
};

export default VideoInstructions;