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
    codes: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    ext1: {
        width: '45%',
        height: '60vh',
    },
    ext2: {
        width: '45%',
    },
    htmlEditor: {
        height: '100%',
        
    },
    htmlControl: {
        flexGrow: 1,
        overflow: 'hidden',
        borderRadius: '10px',
    },
}));