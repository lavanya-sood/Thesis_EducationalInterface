import React from 'react';
import useStyles from './styles.js';
import ReactPlayer from 'react-player'


const VideoInstructions = (videoLocation) => {
    const classes = useStyles(); 
    
    const videoFilePath = videoLocation.videoLocation;

    return (
        <div className={classes.videoInstructions}>
            <div className={classes.videoPanel}>
                <ReactPlayer className={classes.videoBox} url={videoFilePath} controls = {true}  config={{ youtube: { playerVars: { disablekb: 1, modestbranding: 1,fs: 0 } } }} />
            </div>
        </div>
    );
};

export default VideoInstructions;