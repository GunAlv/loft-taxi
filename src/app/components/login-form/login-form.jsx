import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StyledTextField } from '../text-field/style';
import { Link } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { FormAuthContainer, FormAuthRow, FormAuthRowLink, FormAuthRowAction, FormAuthRowNotice } from '../form/form-auth/style';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { setAuth } from '../../module/actions/auth';
import { useForm } from 'react-hook-form';
import ErrorLabel from '../error-label';
import { isEmailValid } from '../../common/utils/validation';

const propTypes = {
    onChangeForm: PropTypes.func.isRequired,
    setAuth: PropTypes.func.isRequired,
    authError: PropTypes.string.isRequired,
};

const LoginForm = ({ onChangeForm, setAuth, authError }) => {
    const [isEmailLostFocus, setEmailLostFocus] = useState(false);
    const [isPasswordLostFocus, setPasswordLostFocus] = useState(false);

    const { handleSubmit, register, errors, formState } = useForm({
        mode: 'onChange',
    });

    const submit = (data) => {
        const email = data['login-email'];
        const password = data['login-password'];

        setAuth(email, password);
    };

    const changeForm = (e) => {
        e.preventDefault();

        onChangeForm('registration');
    };

    const onEmailBlur = () => setEmailLostFocus(true);
    const onEmailChange = () => setEmailLostFocus(false);

    const onPasswordBlur = () => setPasswordLostFocus(true);
    const onPasswordChange = () => setPasswordLostFocus(false);

    return (
        <FormAuthContainer
            data-testid="login-form"
            onSubmit={handleSubmit(submit)}
        >
            { authError && (<ErrorLabel data-testid="login-error">{authError}</ErrorLabel>) }
            <FormAuthRow>
                <StyledTextField
                    type="email"
                    name="login-email"
                    id="login-email"
                    placeholder="mail@mail.ru"
                    label="Email"
                    inputRef={register({
                        required: true,
                        validate: value => {
                            if (!isEmailValid(value)) return 'Неверный формат email';
                        },
                    })}
                    inputProps={{
                        'data-testid': "login-form-email"
                    }}
                    onBlur={onEmailBlur}
                    onChange={onEmailChange}
                />
                {isEmailLostFocus && (errors['login-email']?.type === 'required') && (
                    <ErrorLabel>Email обязателен к заполнению</ErrorLabel>
                )}
                {isEmailLostFocus && (errors['login-email'] && errors['login-email'].message) && (
                    <ErrorLabel>{errors['login-email'].message}</ErrorLabel>
                )}
            </FormAuthRow>
            <FormAuthRow>
                <StyledTextField
                    type="password"
                    name="login-password"
                    id="login-password"
                    placeholder="*************"
                    label="Пароль"
                    inputRef={register({
                        required: true,
                    })}
                    inputProps={{
                        'data-testid': "login-form-password"
                    }}
                    onBlur={onPasswordBlur}
                    onChange={onPasswordChange}
                />
                {isPasswordLostFocus && (errors['login-password']?.type === 'required') && (
                    <ErrorLabel>Пароль обязателен к заполнению</ErrorLabel>
                )}
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
                    disabled={!formState.isValid}
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
        (state => ({
            authError: state.authReducer.authError,
        })),
        (dispatch => ({
            setAuth: (email, password) => dispatch(setAuth(email, password)),
        })),
    ),
)(LoginForm);
