import React, { useContext } from 'react';
import getClass from '../../utils/getClass';
import { AuthContext } from '../../common/providers/auth-provider';

const Menu = (props) => {
    const { logout } = useContext(AuthContext);
    const { onChangePage } = props;

    return (
        <nav className={getClass("menu", props)}>
            <div className="menu__container">
                <ul className="menu__list">
                    <li className="menu__item">
                        <button
                            className="menu__link"
                            type="button"
                            data-mock-url="map-page"
                            onClick={(e) => onChangePage(e.currentTarget.dataset.mockUrl)}
                        >
                            Карта
                        </button>
                    </li>
                    <li className="menu__item">
                        <button
                            className="menu__link"
                            type="button"
                            data-mock-url="profile-page"
                            onClick={(e) => onChangePage(e.currentTarget.dataset.mockUrl)}
                        >
                            Профиль
                        </button>
                    </li>
                    <li className="menu__item">
                        <button
                            className="menu__link"
                            type="button"
                            onClick={logout}
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
