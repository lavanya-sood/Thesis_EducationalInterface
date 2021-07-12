import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    textInstructions: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    codingWindows: {
        display: 'flex',
        flexDirection: 'column',
        // alignItems: 'flex-end',
        width: '100%',
    },
    buttonGroup: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    codeButtons: {
        margin: '5px',
    }
}));