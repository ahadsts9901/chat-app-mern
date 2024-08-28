import '@fontsource/josefin-sans/300.css';
import '@fontsource/josefin-sans/400.css';
import '@fontsource/josefin-sans/500.css';
import '@fontsource/josefin-sans/700.css';

import { createTheme } from '@mui/material/styles';

export const themeSchema: any = {
    palette: {
        primary: {
            light: '#915eff',
            main: '#7b30f7',
            dark: '#6d1ee3',
            contrastText: '#fff',
        },
    },
    typography: {
        fontFamily: 'Josefin Sans, sans-serif',
        textTransform: 'none',
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    borderRadius: '50px',
                    padding: "10px 20px",
                },
            }
        },
    }
}

export const theme = createTheme(themeSchema);