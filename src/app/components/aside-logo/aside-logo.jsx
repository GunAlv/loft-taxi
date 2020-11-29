import React from 'react';
import { AsideLogoContainer, AsideLogoImage } from './style';

import asideLogoImage from './__image/aside-logo__image.svg';

const AsideLogo = () => (
    <AsideLogoContainer>
        <AsideLogoImage src={asideLogoImage} alt="Loft Taxi"/>
    </AsideLogoContainer>
);

export default AsideLogo;
