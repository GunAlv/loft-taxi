import React from 'react';
import { StepFormBlock, StepFormTitleContainer } from './style';
import { Title } from '../title/style';

const StepForm = (props) => {
    const { title, children } = props;

    return (
        <StepFormBlock>
            <StepFormTitleContainer>
                <Title variant="h2" component="h1">
                    {title}
                </Title>
            </StepFormTitleContainer>
            {children}
        </StepFormBlock>
    );
};

export default StepForm;
