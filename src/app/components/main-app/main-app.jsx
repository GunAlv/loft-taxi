import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, withRouter } from "react-router-dom";
import { Switch, Route } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

import MainLayout from '../main-layout';

import WelcomePage from '../../views/welcome-page';
import MapPage from '../../views/map-page';
import ProfilePage from '../../views/profile-page';

const PrivateRoute = ({ component: Component, isLoggedIn, ...rest }) => (
    <Route
        {...rest}
        render={(props) => (
            isLoggedIn
                ? <Component {...props} />
                : <Redirect to={{ pathname: '/'}} />
        )}
    />
);

const propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
};

class MainApp extends React.PureComponent {
    render() {
        const { isLoggedIn } = this.props;

        return (
            <MainLayout isLoggedIn={isLoggedIn}>
                <Switch>
                    <Route exact path='/'>
                        { isLoggedIn ? <Redirect to='/map' /> : <WelcomePage/> }
                    </Route>
                    <PrivateRoute exact path='/map' component={MapPage} isLoggedIn={isLoggedIn}/>
                    <PrivateRoute exact path='/profile' component={ProfilePage} isLoggedIn={isLoggedIn}/>
                    <Redirect to='/'/>
                </Switch>
            </MainLayout>
        );
    };
}

MainApp.propTypes = propTypes;

export default compose(
    connect(
        (state => ({
            isLoggedIn: state.authReducer.isLoggedIn,
        })),
        null,
    ),
    withRouter,
)(MainApp)
