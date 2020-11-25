import React from 'react';
import { AsideLogoBlock, AsideLogoImage } from './style';

import asideLogoImage from './__image/aside-logo__image.svg';

const AsideLogo = () => (
    <AsideLogoBlock>
        <AsideLogoImage src={asideLogoImage} alt="Loft Taxi"/>
    </AsideLogoBlock>
);

export default AsideLogo;
