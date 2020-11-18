import React from 'react';
import getClass from '../../utils/getClass';

const Menu = (props) => {
    const { setPage } = props;

    return (
        <nav className={getClass("menu", props)}>
            <div className="menu__container">
                <ul className="menu__list">
                    <li className="menu__item">
                        <button
                            className="menu__link"
                            type="button"
                            data-mock-url="map-page"
                            onClick={(e) => setPage(e.currentTarget.dataset.mockUrl)}
                        >
                            Карта
                        </button>
                    </li>
                    <li className="menu__item">
                        <button
                            className="menu__link"
                            type="button"
                            data-mock-url="profile-page"
                            onClick={(e) => setPage(e.currentTarget.dataset.mockUrl)}
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
