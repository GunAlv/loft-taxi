import React from 'react';
import PropTypes from 'prop-types';
import { StyledTextField } from '../text-field/style';
import { Link } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { FormAuthContainer, FormAuthRow, FormAuthRowLink, FormAuthRowAction, FormAuthRowNotice } from '../form/form-auth/style';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { setRegister } from '../../module/actions/register';
import ErrorLabel from '../error-label';

const propTypes = {
    onChangeForm: PropTypes.func.isRequired,
    setRegister: PropTypes.func.isRequired,
    registerError: PropTypes.string.isRequired,
};

const RegistrationForm = ({ onChangeForm, setRegister, registerError }) => {
    const submit = (e) => {
        e.preventDefault();

        const email = e.target['registration-email'].value;
        const password = e.target['registration-password'].value;
        const name = e.target['registration-name'].value;
        const surname = e.target['registration-surname'].value;

        setRegister(email, password, name, surname);
    };

    const changeForm = (e) => {
        e.preventDefault();

        onChangeForm('login');
    };

    return (
        <FormAuthContainer
            data-testid="registration-form"
            onSubmit={submit}
        >
            { registerError && (<ErrorLabel data-testid="registration-error">{registerError}</ErrorLabel>) }
            <FormAuthRow>
                <StyledTextField
                    type="email"
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
                    placeholder="Петр"
                    label="Ваше имя?*"
                />
            </FormAuthRow>
            <FormAuthRow>
                <StyledTextField
                    type="text"
                    name="registration-surname"
                    id="registration-surname"
                    placeholder="Иванов"
                    label="Ваша фамилия?*"
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
