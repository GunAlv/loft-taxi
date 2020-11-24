import React from 'react';
import getClass from '../../utils/getClass';

import AsideLogo from '../../components/aside-logo';
import StepForm from '../../components/step-form';
import LoginForm from '../../components/login-form';

class WelcomePage extends React.Component {
    render() {
        const { onChangePage } = this.props;

        return (
            <section className={getClass("welcome-page", this.props)}>
                <AsideLogo/>
                <div className="welcome-page__content">
                    <StepForm mods="welcome-page__step-form">
                        <LoginForm onChangePage={onChangePage}/>
                    </StepForm>
                </div>
            </section>
        );
    };
}

export default WelcomePage;
