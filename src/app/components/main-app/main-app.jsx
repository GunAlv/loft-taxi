import React from 'react';

import Header from '../header';

import WelcomePage from '../../views/welcome-page';
import MapPage from '../../views/map-page';
import ProfilePage from '../../views/profile-page';

class MainApp extends React.Component {
    state = {
        page: 'welcome-page',
    };

    setPage = (page) => {
        this.setState({ page });
    };

    render() {
        const { isLoggedIn } = this.props;
        const { page } = this.state;

        const PAGES = {
            'welcome-page': <WelcomePage onChangePage={this.setPage}/>,
            'map-page': isLoggedIn ? <MapPage/> : <WelcomePage onChangePage={this.setPage}/>,
            'profile-page': isLoggedIn ? <ProfilePage/> : <WelcomePage onChangePage={this.setPage}/>
        };

        return (
            <div className="container">
                <Header onChangePage={this.setPage}/>
                <main className="main">
                    { PAGES[page] }
                </main>
            </div>
        );
    };
}

export default MainApp;
