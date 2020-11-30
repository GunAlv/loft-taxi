import React from 'react';
import PropTypes from 'prop-types';
import { StepFormContainer, StepFormTitleContainer } from './style';
import { Title } from '../title/style';

const propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

const StepForm = ({ title, children }) => {
    return (
        <StepFormContainer>
            <StepFormTitleContainer>
                <Title variant="h2" component="h1">
                    {title}
                </Title>
            </StepFormTitleContainer>
            {children}
        </StepFormContainer>
    );
};

StepForm.propTypes = propTypes;

export default StepForm;
