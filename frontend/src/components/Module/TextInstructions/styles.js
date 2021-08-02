import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    textInstructions: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '80%',
        marginLeft: '10%',
    },
    textColor: {
        backgroundColor: '#d7ecf7',
        paddingLeft: '2px',
        paddingRight: '2px',
        borderRadius: '5px',
        border:'1px solid #b0e4ff',
    }
}));