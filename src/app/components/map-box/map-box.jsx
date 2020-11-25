import React from 'react';
import { MapBoxBlock } from './style';

const MapBox = React.forwardRef((props, ref) => (
    <MapBoxBlock ref={ref} />
));

export default MapBox;
