import React from 'react';
import PropTypes from 'prop-types';
import { Container, Main } from './style';
import Header from '../header';

const propTypes = {
    children: PropTypes.node.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
};

const MainLayout = ({ children, isLoggedIn }) => {
    return (
        <Container>
            { isLoggedIn && <Header/> }
            <Main>
                { children }
            </Main>
        </Container>
    );
};

MainLayout.propTypes = propTypes;

export default MainLayout;
