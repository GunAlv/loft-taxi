import React from 'react';
import Header from '../src/app/components/header';
import WelcomePage from '../src/app/views/welcome-page';
import MapPage from '../src/app/views/map-page';
import ProfilePage from '../src/app/views/profile-page';

class App extends React.Component {
    state = {
        page: 'welcome-page',
    };

    render() {
        const { page } = this.state;

        return (
            <div className="container">
                <Header/>
                <main className="main">
                    {
                        {
                            'welcome-page': <WelcomePage/>,
                            'map-page': <MapPage/>,
                            'profile-page': <ProfilePage/>
                        }[page]
                    }
                </main>
            </div>
        );
    };
}

export default App;
