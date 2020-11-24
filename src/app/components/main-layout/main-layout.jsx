import React from 'react';
import Header from '../header';

const MainLayout = (props) => {
    const { children, onChangePage } = props;

    return (
        <div className="container">
            <Header onChangePage={onChangePage}/>
            <main className="main">
                { children }
            </main>
        </div>
    );
};

export default MainLayout;
