import React from 'react';
import getClass from '../../utils/getClass';

const Menu = (props) => {
    return (
        <nav className={getClass("menu", props)}>
            <div className="menu__container">
                <ul className="menu__list">
                    <li className="menu__item">
                        <button
                            className="menu__link"
                            type="button"
                            data-mock-url="map-page"
                        >
                            Карта
                        </button>
                    </li>
                    <li className="menu__item">
                        <button
                            className="menu__link"
                            type="button"
                            data-mock-url="profile-page"
                        >
                            Профиль
                        </button>
                    </li>
                    <li className="menu__item">
                        <button
                            className="menu__link"
                            type="button"
                        >
                            Выйти
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Menu;
