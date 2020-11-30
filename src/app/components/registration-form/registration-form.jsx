import React from 'react';
import PropTypes from 'prop-types';
import { StyledTextField } from '../text-field/style';
import { Link } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { FormAuthContainer, FormAuthRow, FormAuthRowLink, FormAuthRowAction, FormAuthRowNotice } from '../form/form-auth/style';

const propTypes = {
    onChangePage: PropTypes.func,
};

class RegistrationForm extends React.Component {
    submit = (e) => {
        const { onChangePage } = this.props;

        e.preventDefault();
        onChangePage('map-page');
    }

    render() {
        return (
            <FormAuthContainer onSubmit={this.submit}>
                <FormAuthRow>
                    <StyledTextField
                        type="text"
                        name="registration-email"
                        id="registration-email"
                        placeholder="mail@mail.ru"
                        label="Email*"
                    />
                </FormAuthRow>
                <FormAuthRow>
                    <StyledTextField
                        type="text"
                        name="registration-name"
                        id="registration-name"
                        placeholder="Петр Александрович"
                        label="Как вас зовут?*"
                    />
                </FormAuthRow>
                <FormAuthRow>
                    <StyledTextField
                        type="password"
                        name="registration-password"
                        id="registration-password"
                        placeholder="*************"
                        label="Придумайте пароль*"
                    />
                </FormAuthRow>
                <FormAuthRowLink>
                    <Link
                        color="secondary"
                    >
                        Забыли пароль?
                    </Link>
                </FormAuthRowLink>
                <FormAuthRowAction>
                    <Button
                        variant="contained"
                        type="submit"
                    >
                        Зарегистрироваться
                    </Button>
                </FormAuthRowAction>
                <FormAuthRowNotice>
                    <span>Уже зарегистрированы?</span>
                    <Link>
                        Войти
                    </Link>
                </FormAuthRowNotice>
            </FormAuthContainer>
        );
    };
}

RegistrationForm.propTypes = propTypes;

export default RegistrationForm;
