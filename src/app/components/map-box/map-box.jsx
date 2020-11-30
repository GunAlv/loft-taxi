import React from 'react';
import { MapBoxContainer } from './style';

const MapBox = React.forwardRef((props, ref) => (
    <MapBoxContainer ref={ref} />
));

export default MapBox;
