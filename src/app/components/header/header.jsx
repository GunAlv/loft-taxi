import React from 'react';
import { HeaderBlock, HeaderWrap } from './style';

import Logo from '../logo';
import Menu from '../menu';

const Header = (props) => {
    const { onChangePage } = props;

    return (
        <HeaderBlock>
            <HeaderWrap>
                <Logo/>
                <Menu onChangePage={onChangePage}/>
            </HeaderWrap>
        </HeaderBlock>
    );
};

export default Header;
