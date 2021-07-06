import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    videoInstructions: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    videoPanel: {
        backgroundColor: '#cccccc',
        width: '60vw',
        height: '60vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    videoBox: {
        flexShrink: 0,
        minWidth: '100%',
        minHeight: '100%'
    },
}));