import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/styles';
import { theme } from './common/utils/theme';
import { ThemeProvider } from 'styled-components';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Router } from 'react-router-dom';

export const wrapTestToProvider = (Component, history, props) => (
    <Router history={history}>
        <Provider store={store}>
            <MuiThemeProvider theme={theme}>
                <ThemeProvider theme={theme}>
                    <CssBaseline>
                        <Component {...props}/>
                    </CssBaseline>
                </ThemeProvider>
            </MuiThemeProvider>
        </Provider>
    </Router>
);
