import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { MenuContainer, MenuList, MenuListItem, MenuLink } from './style';
import { AuthContext } from '../../common/providers/auth-provider';

const propTypes = {
    onChangePage: PropTypes.func,
};

const Menu = ({ onChangePage }) => {
    const { logout } = useContext(AuthContext);

    return (
        <MenuContainer
            data-testid="menu"
        >
            <MenuList>
                <MenuListItem>
                    <MenuLink
                        data-mock-url="map-page"
                        onClick={(e) => onChangePage(e.currentTarget.dataset.mockUrl)}
                    >
                        Карта
                    </MenuLink>
                </MenuListItem>
                <MenuListItem>
                    <MenuLink
                        data-mock-url="profile-page"
                        onClick={(e) => onChangePage(e.currentTarget.dataset.mockUrl)}
                    >
                        Профиль
                    </MenuLink>
                </MenuListItem>
                <MenuListItem>
                    <MenuLink
                        onClick={logout}
                    >
                        Выйти
                    </MenuLink>
                </MenuListItem>
            </MenuList>
        </MenuContainer>
    );
};

Menu.propTypes = propTypes;

export default Menu;
