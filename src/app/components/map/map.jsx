import React from 'react';
import getClass from '../../utils/getClass';

const Map = (props) => (
    <div className={getClass("map", props)}>
        <h1>Карта</h1>
    </div>
);

export default Map;
