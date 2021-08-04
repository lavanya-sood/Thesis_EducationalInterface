import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    textInstructions: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    button: {
        width: '200px',
    },
    timerDiv: {
        width: '100%',
        textAlign: 'right',
    },
    timeText: {
        marginTop: '10px',
        color: '#a6a6a6',
    }
}));