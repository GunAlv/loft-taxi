import React from 'react';
import PropTypes from 'prop-types';
import { StyledTextField } from '../text-field/style';
import { Link } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { FormAuthContainer, FormAuthRow, FormAuthRowLink, FormAuthRowAction, FormAuthRowNotice } from '../form/form-auth/style';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { setAuth } from '../../module/actions/auth';

const propTypes = {
    onChangeForm: PropTypes.func.isRequired,
    setAuth: PropTypes.func.isRequired,
};

const LoginForm = ({ onChangeForm, setAuth }) => {
    const submit = (e) => {
        e.preventDefault();

        const email = e.target['login-email'].value;
        const password = e.target['login-password'].value;

        setAuth(email, password)
    };

    const changeForm = (e) => {
        e.preventDefault();

        onChangeForm('registration');
    };

    return (
        <FormAuthContainer
            data-testid="login-form"
            onSubmit={submit}
        >
            <FormAuthRow>
                <StyledTextField
                    type="email"
                    name="login-email"
                    id="login-email"
                    placeholder="mail@mail.ru"
                    label="Email"
                />
            </FormAuthRow>
            <FormAuthRow>
                <StyledTextField
                    type="password"
                    name="login-password"
                    id="login-password"
                    placeholder="*************"
                    label="Пароль"
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
                    Войти
                </Button>
            </FormAuthRowAction>
            <FormAuthRowNotice>
                <span>Новый пользователь?</span>
                <Link
                    onClick={changeForm}
                >
                    Регистрация
                </Link>
            </FormAuthRowNotice>
        </FormAuthContainer>
    );
}

LoginForm.propTypes = propTypes;

export default compose(
    connect(
        null,
        (dispatch => ({
            setAuth: (email, password) => dispatch(setAuth(email, password)),
        })),
    ),
)(LoginForm);
