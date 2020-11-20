import React from 'react';
import getClass from '../../utils/getClass';

import AsideLogo from '../../components/aside-logo';
import StepForm from '../../components/step-form';
import LoginForm from '../../components/login-form';
import RegistrationForm from '../../components/registration-form';

class WelcomePage extends React.Component {
    render() {
        const { isLogin, onChangePage } = this.props;

        return (
            <section className={getClass("welcome-page", this.props)}>
                <AsideLogo/>
                <div className="welcome-page__content">
                    <StepForm mods="welcome-page__step-form">
                        {
                            isLogin ? (
                                <LoginForm onChangePage={onChangePage}/>
                            ) : (
                                <RegistrationForm onChangePage={onChangePage}/>
                            )
                        }
                    </StepForm>
                </div>
            </section>
        );
    };
}

export default WelcomePage;
