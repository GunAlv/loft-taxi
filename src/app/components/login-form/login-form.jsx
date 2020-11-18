import React from 'react';
import getClass from '../../utils/getClass';

class LoginForm extends React.Component {
    submit = (e) => {
        const { setPage } = this.props;

        e.preventDefault();
        setPage('map-page');
    }

    render() {
        return (
            <form onSubmit={this.submit} className={getClass("login-form form", this.props)}>
                <div className="form__body">
                    <div className="form__row">
                        <div className="form__col">
                            <label htmlFor="login-email" className="form__label">
                                Email
                            </label>
                            <div className="form__control">
                                <input
                                    type="text"
                                    name="login-email"
                                    id="login-email"
                                    className="input form__input"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form__row">
                        <div className="form__col">
                            <label htmlFor="login-password" className="form__label">
                                Пароль
                            </label>
                            <div className="form__control">
                                <input
                                    type="password"
                                    name="login-password"
                                    id="login-password"
                                    className="input form__input"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form__row-link">
                        <a href="#" className="link link_theme_additional">
                            Забыли пароль?
                        </a>
                    </div>
                    <div className="form__row-action">
                        <button className="button button_theme_standard" type="submit">
                            Войти
                        </button>
                    </div>
                    <div className="form__row-notice">
                        Новый пользователь?
                        <a href="#" className="link link_theme_standard">
                            Регистрация
                        </a>
                    </div>
                </div>
            </form>
        );
    };
}

export default LoginForm;
