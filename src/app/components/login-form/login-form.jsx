import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { FormBody } from '../form/style';
import { StyledTextField } from '../text-field/style';
import { Link } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { FormAuthBlock, FormAuthRow, FormAuthRowLink, FormAuthRowAction, FormAuthRowNotice } from '../form/form-auth/style';
import { AuthContext } from '../../common/providers/auth-provider';

const propTypes = {
    onChangePage: PropTypes.func,
};

const LoginForm = ({ onChangePage }) => {
    const { login } = useContext(AuthContext);

    const submit = (e) => {
        e.preventDefault();
        login();
        onChangePage('map-page');
    };

    return (
        <FormAuthBlock
            data-testid="login-form"
            onSubmit={submit}
        >
            <FormBody>
                <FormAuthRow>
                    <StyledTextField
                        type="text"
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
                    <Link>
                        Регистрация
                    </Link>
                </FormAuthRowNotice>
            </FormBody>
        </FormAuthBlock>
    );
}

LoginForm.propTypes = propTypes;

export default LoginForm;
