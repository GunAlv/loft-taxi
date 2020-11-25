import React from 'react';
import { WelcomePageBlock, WelcomePageContent } from './style';

import AsideLogo from '../../components/aside-logo';
import StepForm from '../../components/step-form';
import LoginForm from '../../components/login-form';

class WelcomePage extends React.Component {
    render() {
        const { onChangePage } = this.props;

        return (
            <WelcomePageBlock>
                <AsideLogo/>
                <WelcomePageContent>
                    <StepForm title="Вход">
                        <LoginForm onChangePage={onChangePage}/>
                    </StepForm>
                </WelcomePageContent>
            </WelcomePageBlock>
        );
    };
}

export default WelcomePage;
