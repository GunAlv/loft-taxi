import React from 'react';
import PropTypes from 'prop-types';
import { MenuContainer, MenuList, MenuListItem, MenuLink } from './style';
import { Link as RouteLink, withRouter } from "react-router-dom";
import { compose } from 'redux';
import { connect } from 'react-redux';
import { removeAuth } from '../../module/actions/auth';

const propTypes = {
    removeAuth: PropTypes.func.isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string,
    }).isRequired,
};

const Menu = ({ removeAuth, location }) => {
    const logout = (e) => {
        e.preventDefault();
        removeAuth();
    };

    const isActive = (path) => {
        return location.pathname === path && 'active';
    };

    return (
        <MenuContainer
            data-testid="menu"
        >
            <MenuList>
                <MenuListItem>
                    <MenuLink
                        to='/map'
                        className={isActive('/map')}
                        component={RouteLink}
                    >
                        Карта
                    </MenuLink>
                </MenuListItem>
                <MenuListItem>
                    <MenuLink
                        to='/profile'
                        className={isActive('/profile')}
                        component={RouteLink}
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
    withRouter,
)(Menu);
