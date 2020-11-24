import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import AuthProvider from '../src/app/common/providers/auth-provider';
import MainApp from '../src/app/components/main-app';

const theme = createMuiTheme({
    overrides: {
        MuiCssBaseline: {
            '@global': {
                body: {
                    fontSize: '18px',
                    lineHeight: '21px',
                    letterSpacing: 0,
                    color: '#000',
                    backgroundColor: '#fff',
                },
            },
        },
    },
});

class App extends React.Component {
    render() {
        return (
            <ThemeProvider theme={theme}>
                <CssBaseline>
                    <AuthProvider>
                        <MainApp/>
                    </AuthProvider>
                </CssBaseline>
            </ThemeProvider>
        );
    };
}

export default App;
