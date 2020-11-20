import React from 'react';
import getClass from '../../utils/getClass';

class RegistrationForm extends React.Component {
    submit = (e) => {
        const { onChangePage } = this.props;

        e.preventDefault();
        onChangePage('map-page');
    }

    render() {
        return (
            <form onSubmit={this.submit} className={getClass("registration-form form", this.props)}>
                <div className="form__body">
                    <div className="form__row">
                        <div className="form__col">
                            <label htmlFor="registration-email" className="form__label">
                                Email*
                            </label>
                            <div className="form__control">
                                <input
                                    type="text"
                                    name="registration-email"
                                    id="registration-email"
                                    className="input form__input"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form__row">
                        <div className="form__col">
                            <label htmlFor="registration-name" className="form__label">
                                Как вас зовут?*
                            </label>
                            <div className="form__control">
                                <input
                                    type="text"
                                    name="registration-name"
                                    id="registration-name"
                                    className="input form__input"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form__row">
                        <div className="form__col">
                            <label htmlFor="registration-password" className="form__label">
                                Придумайте пароль*
                            </label>
                            <div className="form__control">
                                <input
                                    type="password"
                                    name="registration-password"
                                    id="registration-password"
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
                            Зарегистрироваться
                        </button>
                    </div>
                    <div className="form__row-notice">
                        Уже зарегистрированы?
                        <a href="#" className="link link_theme_standard">
                            Войти
                        </a>
                    </div>
                </div>
            </form>
        );
    };
}

export default RegistrationForm;
