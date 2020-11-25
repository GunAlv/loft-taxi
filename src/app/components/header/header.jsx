import React from 'react';
import PropTypes from 'prop-types';
import { HeaderBlock, HeaderWrap } from './style';

import Logo from '../logo';
import Menu from '../menu';

const propTypes = {
    onChangePage: PropTypes.func,
};

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

Header.propTypes = propTypes;

export default Header;
