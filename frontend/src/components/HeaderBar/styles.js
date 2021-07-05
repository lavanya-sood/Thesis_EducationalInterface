import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 240;

export default makeStyles((theme) => ({
    appBar: {
        display: 'flex',
        justifyContent: 'space-between',
        zIndex: theme.zIndex.drawer + 1,
    },
    welcomeInfo: {
        color: 'white',
    },
    headingappBar: {
        flexGrow: 1,
    }
}));