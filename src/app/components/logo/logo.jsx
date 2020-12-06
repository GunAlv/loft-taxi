import React from 'react';
import { Link } from '@material-ui/core';
import { Link as RouteLink } from "react-router-dom";

import logoImage from './__image/logo__image.svg';

const Logo = () => (
    <Link
        to='/map'
        component={RouteLink}
    >
        <img src={logoImage} alt="Loft Taxi"/>
    </Link>
);

export default Logo;
