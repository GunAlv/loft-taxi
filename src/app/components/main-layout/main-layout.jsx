import React from 'react';
import PropTypes from 'prop-types';
import { Container, Main } from './style';
import Header from '../header';

const propTypes = {
    page: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    onChangePage: PropTypes.func,
};

const MainLayout = ({ page, children, onChangePage }) => {
    return (
        <Container>
            {
                page !== 'welcome-page' && (
                    <Header onChangePage={onChangePage}/>
                )
            }
            <Main>
                { children }
            </Main>
        </Container>
    );
};

MainLayout.propTypes = propTypes;

export default MainLayout;
