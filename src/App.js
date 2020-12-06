import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { ThemeProvider } from 'styled-components';
import { theme } from './app/common/utils/theme';
import CssBaseline from '@material-ui/core/CssBaseline';
import MainApp from '../src/app/components/main-app';

import store from './app/store';

class App extends React.Component {
    render() {
        return (
            <Router>
                <Provider store={store}>
                    <MuiThemeProvider theme={theme}>
                        <ThemeProvider theme={theme}>
                            <CssBaseline>
                                <MainApp/>
                            </CssBaseline>
                        </ThemeProvider>
                    </MuiThemeProvider>
                </Provider>
            </Router>
        );
    };
}

export default App;
