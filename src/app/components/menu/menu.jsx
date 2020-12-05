import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { MenuContainer, MenuList, MenuListItem, MenuLink } from './style';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { removeAuth } from '../../module/actions/auth';

const propTypes = {
    removeAuth: PropTypes.func.isRequired,
};

const Menu = ({ removeAuth }) => {
    const logout = (e) => {
        e.preventDefault();
        removeAuth();
    };

    return (
        <MenuContainer
            data-testid="menu"
        >
            <MenuList>
                <MenuListItem>
                    <MenuLink
                        to='/map'
                        activeClassName='active'
                        component={NavLink}
                    >
                        Карта
                    </MenuLink>
                </MenuListItem>
                <MenuListItem>
                    <MenuLink
                        to='/profile'
                        activeClassName='active'
                        component={NavLink}
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

export default compose(
    connect(
        null,
        (dispatch => ({
            removeAuth: () => dispatch(removeAuth()),
        })),
    ),
)(Menu);
