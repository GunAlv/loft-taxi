import React, { useContext } from 'react';
import { MenuBlock, MenuList, MenuListItem, MenuLink } from './style';
import { AuthContext } from '../../common/providers/auth-provider';

const Menu = (props) => {
    const { logout } = useContext(AuthContext);
    const { onChangePage } = props;

    return (
        <MenuBlock>
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
        </MenuBlock>
    );
};

export default Menu;
