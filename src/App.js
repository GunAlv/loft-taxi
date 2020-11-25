import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { theme } from '../src/app/common/utils/theme';
import CssBaseline from '@material-ui/core/CssBaseline';
import AuthProvider from '../src/app/common/providers/auth-provider';
import MainApp from '../src/app/components/main-app';

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
