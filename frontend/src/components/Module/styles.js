import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 240;

export default makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
      },
      menuButton: {
        marginRight: 10,
      },
      hide: {
        display: 'none',
      },
      drawer: {
        width: drawerWidth,
        flexShrink: 0,
      },
      drawerOpen: {
        width: drawerWidth,
        paddingLeft: '10px',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
      drawerClose: {
        paddingLeft: '10px',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9) + 1,
        },
      },
      toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
      },
      content: {
        flexGrow: 1,
        padding: theme.spacing(3),
      },
      divider: {
          marginBottom: '20px',
      },
      buttonGroup: {
        display: 'flex',
        justifyContent: 'space-between',
      },
      listModules: {
        display: 'flex',
        flexDirection: 'column',
        marginRight: 10,
      },
      navLinks: {
        textDecoration: 'none',
        color: '#22658A',
      },
      navLinksDisabled: {
        textDecoration: 'none',
        color: '#69706b',
        cursor: 'not-allowed'
      },
      linkButton: {
        textDecoration: 'none',
      },
      navCurrent: {
        textDecoration: 'underline',
        color: '#22658A',
      },
      linkJump: {
        color: '#22658A',
        textDecoration: 'underline',
        fontWeight: 'bold'
      },
      headingPr: {
        color: '#2b3033',
      },
      progressBar: {
        width: '100%',
        '& > * + *': {
          marginTop: theme.spacing(2),
        },
      }
}));