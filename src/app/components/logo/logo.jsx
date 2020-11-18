import React from 'react';
import getClass from '../../utils/getClass';

import logoImage from './__image/logo__image.svg';

const Logo = (props) => (
    <a href="/" className={getClass("logo", props)}>
        <img className="logo__image" src={logoImage} alt="Loft Taxi"/>
    </a>
);

export default Logo;
