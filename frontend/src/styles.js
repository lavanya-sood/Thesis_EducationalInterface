//import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

// export default makeStyles (() => ({


// }));

const themes = createMuiTheme({
    palette: {
      primary: {
        main: '#3E93C3',
        light: '#102E4A',
        dark: '#22658A',
      },
      secondary: {
        main: '#77BEE5',
      },
    },
});

export default themes;