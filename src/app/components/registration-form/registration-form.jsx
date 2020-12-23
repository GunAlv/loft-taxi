import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StyledTextField } from '../text-field/style';
import { Link } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { FormAuthContainer, FormAuthRow, FormAuthRowLink, FormAuthRowAction, FormAuthRowNotice } from '../form/form-auth/style';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { setRegister } from '../../module/actions/register';
import ErrorLabel from '../error-label';
import { useForm } from 'react-hook-form';
import { isEmailValid, isOnlyLetters } from '../../common/utils/validation';

const PASSWORD_MIN_LENGTH = 3;

const propTypes = {
    onChangeForm: PropTypes.func.isRequired,
    setRegister: PropTypes.func.isRequired,
    registerError: PropTypes.string.isRequired,
};

const RegistrationForm = ({ onChangeForm, setRegister, registerError }) => {
    const [isEmailLostFocus, setEmailLostFocus] = useState(false);
    const [isPasswordLostFocus, setPasswordLostFocus] = useState(false);
    const [isNameLostFocus, setNameLostFocus] = useState(false);
    const [isSurnameLostFocus, setSurnameLostFocus] = useState(false);

    const methods = useForm({
        mode: 'onChange',
    });
    const { handleSubmit, register, errors, formState } = methods;

    const submit = (data) => {
        const email = data['registration-email'];
        const password = data['registration-password'];
        const name = data['registration-name'];
        const surname = data['registration-surname'];

        setRegister(email, password, name, surname);
    };

    const changeForm = (e) => {
        e.preventDefault();

        onChangeForm('login');
    };

    const onEmailBlur = () => setEmailLostFocus(true);
    const onEmailChange = () => setEmailLostFocus(false);

    const onPasswordBlur = () => setPasswordLostFocus(true);
    const onPasswordChange = () => setPasswordLostFocus(false);

    const onNameBlur = () => setNameLostFocus(true);
    const onNameChange = () => setNameLostFocus(false);

    const onSurnameBlur = () => setSurnameLostFocus(true);
    const onSurnameChange = () => setSurnameLostFocus(false);

    return (
        <FormAuthContainer
            data-testid="registration-form"
            onSubmit={handleSubmit(submit)}
        >
            { registerError && (<ErrorLabel data-testid="registration-error">{registerError}</ErrorLabel>) }
            <FormAuthRow>
                <StyledTextField
                    type="email"
                    name="registration-email"
                    id="registration-email"
                    placeholder="mail@mail.ru"
                    label="Email*"
                    inputRef={register({
                        required: true,
                        validate: value => {
                            if (!isEmailValid(value)) return 'Неверный формат email';
                        },
                    })}
                    inputProps={{
                        'data-testid': "registration-form-email"
                    }}
                    onBlur={onEmailBlur}
                    onChange={onEmailChange}
                />
                {isEmailLostFocus && (errors['registration-email']?.type === 'required') && (
                    <ErrorLabel>Email обязателен к заполнению</ErrorLabel>
                )}
                {isEmailLostFocus && (errors['registration-email'] && errors['registration-email'].message) && (
                    <ErrorLabel>{errors['registration-email'].message}</ErrorLabel>
                )}
            </FormAuthRow>
            <FormAuthRow>
                <StyledTextField
                    type="text"
                    name="registration-name"
                    id="registration-name"
                    placeholder="Петр"
                    label="Ваше имя?*"
                    inputRef={register({
                        required: true,
                        validate: val => {
                            if (!isOnlyLetters(val)) return 'Имя не должно содержать цифры';
                        }
                    })}
                    inputProps={{
                        'data-testid': "registration-form-name"
                    }}
                    onBlur={onNameBlur}
                    onChange={onNameChange}
                />
                {isNameLostFocus && (errors['registration-name']?.type === 'required') && (
                    <ErrorLabel>Имя обязательно к заполнению</ErrorLabel>
                )}
                {isNameLostFocus && (errors['registration-name'] && errors['registration-name'].message) && (
                    <ErrorLabel>{errors['registration-name'].message}</ErrorLabel>
                )}
            </FormAuthRow>
            <FormAuthRow>
                <StyledTextField
                    type="text"
                    name="registration-surname"
                    id="registration-surname"
                    placeholder="Иванов"
                    label="Ваша фамилия?*"
                    inputRef={register({
                        required: true,
                        validate: val => {
                            if (!isOnlyLetters(val)) return 'Фамилия не должна содержать цифры';
                        }
                    })}
                    inputProps={{
                        'data-testid': "registration-form-surname"
                    }}
                    onBlur={onSurnameBlur}
                    onChange={onSurnameChange}
                />
                {isSurnameLostFocus && (errors['registration-surname']?.type === 'required') && (
                    <ErrorLabel>Фамилия обязательна к заполнению</ErrorLabel>
                )}
                {isSurnameLostFocus && (errors['registration-surname'] && errors['registration-surname'].message) && (
                    <ErrorLabel>{errors['registration-surname'].message}</ErrorLabel>
                )}
            </FormAuthRow>
            <FormAuthRow>
                <StyledTextField
                    type="password"
                    name="registration-password"
                    id="registration-password"
                    placeholder="*************"
                    label="Придумайте пароль*"
                    inputRef={register({
                        required: true,
                        minLength: PASSWORD_MIN_LENGTH,
                    })}
                    inputProps={{
                        'data-testid': "registration-form-password"
                    }}
                    onBlur={onPasswordBlur}
                    onChange={onPasswordChange}
                />
                {isPasswordLostFocus && (errors['registration-password']?.type === 'required') && (
                    <ErrorLabel>Пароль обязателен к заполнению</ErrorLabel>
                )}
                {isPasswordLostFocus && (errors['registration-password']?.type === 'minLength') && (
                    <ErrorLabel>Минимальное количество символов {PASSWORD_MIN_LENGTH}</ErrorLabel>
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
                    Зарегистрироваться
                </Button>
            </FormAuthRowAction>
            <FormAuthRowNotice>
                <span>Уже зарегистрированы?</span>
                <Link
                    onClick={changeForm}
                >
                    Войти
                </Link>
            </FormAuthRowNotice>
        </FormAuthContainer>
    );
}

RegistrationForm.propTypes = propTypes;

export default compose(
    connect(
        (state => ({
            registerError: state.registerReducer.registerError,
        })),
        (dispatch => ({
            setRegister: (email, password, name, surname) => dispatch(setRegister(email, password, name, surname)),
        })),
    ),
)(RegistrationForm);
