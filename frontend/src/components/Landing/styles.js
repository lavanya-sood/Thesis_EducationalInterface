import { pink } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
    outsideContainer: {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        // backgroundColor: '#bfe9ff',
        backgroundImage: 'linear-gradient(#bfe9ff, #94daff)',
    },
    insideContainer: { 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: '10px',
        height: '40vh',
        width: '40vw',
    },
    startButton: {
        paddingTop: '15px',
        paddingBottom: '15px',
        paddingLeft: '30px',
        paddingRight: '30px',
    },
    textBoxCode: {
        width: '25vw',
        backgroundColor: '#f5fbff',
        // border: '1px solid black'
    },
    heading: {
        paddingBottom: '30px',
    }
}));