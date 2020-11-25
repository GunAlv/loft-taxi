import React from 'react';

import MainLayout from '../main-layout';

import WelcomePage from '../../views/welcome-page';
import MapPage from '../../views/map-page';
import ProfilePage from '../../views/profile-page';

import withAuth from '../../common/HOCs/withAuth';

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
            <MainLayout
                page={page}
                onChangePage={this.setPage}
            >
                { PAGES[page] }
            </MainLayout>
        );
    };
}

export default withAuth(MainApp);
