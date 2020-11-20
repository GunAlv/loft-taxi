import React from 'react';
import getClass from '../../utils/getClass';

import asideLogoImage from './__image/aside-logo__image.svg';

const AsideLogo = (props) => (
    <aside className={getClass("aside-logo", props)}>
        <img className="aside-logo__image" src={asideLogoImage} alt="Loft Taxi"/>
    </aside>
);

export default AsideLogo;
