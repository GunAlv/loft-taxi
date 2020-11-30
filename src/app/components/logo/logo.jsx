import React from 'react';
import { Link } from '@material-ui/core';

import logoImage from './__image/logo__image.svg';

const Logo = () => (
    <Link
        href="/"
    >
        <img src={logoImage} alt="Loft Taxi"/>
    </Link>
);

export default Logo;
