import React from 'react';
import getClass from '../../utils/getClass';

import Logo from '../logo';
import Menu from '../menu';

const Header = (props) => {
    const { onChangePage } = props;

    return (
        <header className={getClass("header", props)}>
            <div className="wrapper">
                <div className="header__wrap">
                    <Logo mods="header__logo"/>
                    <Menu onChangePage={onChangePage} mods="header__menu"/>
                </div>
            </div>
        </header>
    );
};

export default Header;
