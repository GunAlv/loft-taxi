import React from 'react';
import { HeaderContainer } from './style';

import Logo from '../logo';
import Menu from '../menu';

const Header = () => {
    return (
        <HeaderContainer>
            <Logo/>
            <Menu/>
        </HeaderContainer>
    );
};

export default Header;
