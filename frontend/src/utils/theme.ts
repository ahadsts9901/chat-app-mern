import '@fontsource/josefin-sans/300.css';
import '@fontsource/josefin-sans/400.css';
import '@fontsource/josefin-sans/500.css';
import '@fontsource/josefin-sans/700.css';

import { createTheme } from '@mui/material/styles';

export const themeSchema: any = {
    palette: {
        primary: {
            light: '#7ae3c3', // teal-light
            main: '#00a884',  // icon-green
            dark: '#005c4b',  // outgoing-background
            contrastText: '#e9edef',  // primary-strong
        },
        secondary: {
            main: '#8696a0',  // secondary & icon-lighter
            contrastText: '#e9edef',  // primary-strong
        },
        background: {
            default: '#0b141a',  // conversation-panel-background
            paper: '#202c33',    // incoming-background / panel-header-background
        },
        text: {
            primary: '#e9edef',  // primary-strong
            secondary: '#8696a0', // icon-lighter / secondary
        },
        divider: 'rgba(134,150,160,0.15)',  // conversation-border
        action: {
            hover: '#202c33', // background-default-hover / incoming-background
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
                containedPrimary: {
                    backgroundColor: '#00a884',  // icon-green
                    "&:hover": {
                        backgroundColor: '#005c4b',  // outgoing-background
                    },
                },
                containedSecondary: {
                    border: "1px solid #8696a0",  // secondary / icon-lighter
                    boxShadow: "none",
                    "&:hover": {
                        boxShadow: "none",
                        border: "2px solid #8696a0",  // secondary / icon-lighter
                        padding: "8.75px 19px"
                    }
                },
            }
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#202c33', // panel-header-background
                    color: '#aebac1', // panel-header-icon
                }
            }
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: '#182229', // dropdown-background
                },
                elevation1: {
                    '&:hover': {
                        backgroundColor: '#182229', // dropdown-background-hover
                    }
                }
            }
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    backgroundColor: '#2a3942', // input-background
                }
            }
        }
    }
}

export const theme = createTheme(themeSchema);