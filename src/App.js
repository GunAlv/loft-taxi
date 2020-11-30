import React from 'react';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { ThemeProvider } from 'styled-components';
import { theme } from './app/common/utils/theme';
import CssBaseline from '@material-ui/core/CssBaseline';
import AuthProvider from '../src/app/common/providers/auth-provider';
import MainApp from '../src/app/components/main-app';

class App extends React.Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <ThemeProvider theme={theme}>
                    <CssBaseline>
                        <AuthProvider>
                            <MainApp/>
                        </AuthProvider>
                    </CssBaseline>
                </ThemeProvider>
            </MuiThemeProvider>
        );
    };
}

export default App;
