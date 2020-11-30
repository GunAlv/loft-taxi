import React from 'react';
import PropTypes from 'prop-types';
import { HeaderContainer } from './style';

import Logo from '../logo';
import Menu from '../menu';

const propTypes = {
    onChangePage: PropTypes.func,
};

const Header = ({ onChangePage }) => {
    return (
        <HeaderContainer>
            <Logo/>
            <Menu onChangePage={onChangePage}/>
        </HeaderContainer>
    );
};

Header.propTypes = propTypes;

export default Header;
