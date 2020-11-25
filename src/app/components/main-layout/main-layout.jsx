import React from 'react';
import { Container, Main } from './style';
import Header from '../header';

const MainLayout = (props) => {
    const { page, children, onChangePage } = props;

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

export default MainLayout;
