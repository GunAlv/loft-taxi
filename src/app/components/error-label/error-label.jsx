import React from 'react';
import PropTypes from 'prop-types';
import { ErrorLabelContainer } from './style';

const propTypes = {
    children: PropTypes.node,
};

const defaultProps = {
    children: 'Ошибка',
};

const ErrorLabel = ({ children }) => (
    <ErrorLabelContainer>
        {children}
    </ErrorLabelContainer>
);

ErrorLabel.defaultProps = defaultProps;
ErrorLabel.propTypes = propTypes;

export default ErrorLabel;
