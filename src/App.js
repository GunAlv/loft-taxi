import React from 'react';
import Header from '../src/app/components/header';
import WelcomePage from '../src/app/views/welcome-page';
import MapPage from '../src/app/views/map-page';
import ProfilePage from '../src/app/views/profile-page';

class App extends React.Component {
    state = {
        page: 'welcome-page',
    };

    setPage = (page) => {
        this.setState({ page });
    };

    render() {
        const { page } = this.state;

        const PAGES = {
            'welcome-page': <WelcomePage onChangePage={this.setPage}/>,
            'map-page': <MapPage/>,
            'profile-page': <ProfilePage/>,
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

export default App;
