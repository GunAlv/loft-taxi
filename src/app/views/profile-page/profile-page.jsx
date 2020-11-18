import React from 'react';
import getClass from '../../utils/getClass';

import Profile from '../../components/profile';

class ProfilePage extends React.Component {
    render() {
        return (
            <section className={getClass("profile-page", this.props)}>
                <Profile mods="profile-page__map"/>
            </section>
        );
    };
}

export default ProfilePage;
