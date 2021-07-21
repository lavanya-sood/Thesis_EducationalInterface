import React from 'react';
import PropTypes from 'prop-types';
import { Paper ,Typography, Box, Tabs, Tab} from '@material-ui/core';
import useStyles from './styles.js';
import TextInstructions from '../TextInstructions/TextInstructions.js';
import VideoInstructions from '../VideoInstructions/VideoInstructions.js';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
const Instructions = (module) => {
    const classes = useStyles();

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    React.useEffect(()=> {
      console.log("IN THE INSTRUCTIONS");
      console.log(module);
    },[module]);
    
    return (
        <div className={classes.clInstructions}>
            <Typography variant="h4"> Hello World </Typography>
            <br />
            <Paper position="static">
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="Video Instructions" />
                    <Tab label="Text Instructions" />
                </Tabs>
            </Paper>
            <TabPanel value={value} index={0}>
                <VideoInstructions/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <TextInstructions/>
            </TabPanel>
        </div>
    );
};

export default Instructions;