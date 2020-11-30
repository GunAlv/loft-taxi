import React from 'react';
import PropTypes from 'prop-types';
import { WelcomePageBlock, WelcomePageContent } from './style';

import AsideLogo from '../../components/aside-logo';
import StepForm from '../../components/step-form';
import RegistrationForm from '../../components/registration-form';
import LoginForm from '../../components/login-form';

class WelcomePage extends React.Component {
    state = {
        form: 'registration',
    };

    onChangeForm = (form) => {
        this.setState({ form });
    };

    render() {
        return (
            <WelcomePageBlock>
                <AsideLogo/>
                <WelcomePageContent>
                    {
                        this.state.form === 'registration' ? (
                            <StepForm title="Регистрация">
                                <RegistrationForm
                                    onChangeForm={this.onChangeForm}
                                />
                            </StepForm>
                        ) : (
                            <StepForm title="Вход">
                                <LoginForm
                                    onChangeForm={this.onChangeForm}
                                />
                            </StepForm>
                        )
                    }
                </WelcomePageContent>
            </WelcomePageBlock>
        );
    };
}

export default WelcomePage;
