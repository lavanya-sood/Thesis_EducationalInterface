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
        color: 'white',
    },
    htmlWindow: {
        border: '1px solid #cccccc',
        height: '90%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '10px',
    },
    outputWindow: {
        border: '1px solid #cccccc',
        height: '90%',
        borderRadius: '10px',
        
    },
    imgWindow: {
        border: '1px solid #cccccc',
        height: '90%',
        borderRadius: '10px',
        
    },
    codes: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    codesFinal: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    ext1: {
        width: '45%',
        height: '60vh',
    },
    ext2: {
        width: '45%',
    },
    ext1Final: {
        width: '35%',
        height: '60vh',
    },
    ext2Final: {
        width: '25%',
        height: '60vh',
    },
    ext3Final: {
        width: '35%',
    },
    htmlEditor: {
        height: '100%',
        
    },
    htmlControl: {
        flexGrow: 1,
        overflow: 'hidden',
        borderRadius: '10px',
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: '#eeeeee',
        border: '2px solid #ccccc',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        textAlign: 'center',
        width: '50vw',
    },
    timerDiv: {
        width: '100%',
        textAlign: 'right',
    },
    timeText: {
        marginTop: '10px',
        color: '#a6a6a6',
    },
    paragraph: {
        textAlign: "center",
    }
}));