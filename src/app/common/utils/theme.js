import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#ffc617',
            dark: '#1C1A19',
            light: '#ffffff',
        },
        secondary: {
            main: '#828282',
        },
    },
    overrides: {
        MuiCssBaseline: {
            '@global': {
                html: {
                    height: '100%',
                },
                body: {
                    fontSize: '18px',
                    lineHeight: '21px',
                    letterSpacing: 0,
                    color: '#000',
                    backgroundColor: '#fff',
                    height: 0,
                    minHeight: '100%',
                },
                a: {
                    fontSize: '16px',
                    lineHeight: '19px',
                    cursor: 'pointer',
                }
            },
        },
        MuiFormLabel: {
            root: {
                '&$focused': {
                    color: '#000',
                }
            }
        },
        MuiInput: {
            underline: {
                '&:after': {
                    'border-bottom-color': '#ffc617'
                }
            }
        },
        MuiButton: {
            root: {
                textTransform: 'none'
            },
            contained: {
                boxShadow: 'none',
                borderRadius: '70px',
                width: '100%',
                padding: '16px 20px',
                fontSize: '24px',
                lineHeight: '28px',
                backgroundColor: '#FDBF5A',
                '&:focus, &:hover': {
                    color: '#000',
                    backgroundColor: '#FDBF5A',
                }
            }
        },
    },
    typography: {
        h2: {
            fontSize: '30px',
            lineHeight: '35px',
        },
    }
});
