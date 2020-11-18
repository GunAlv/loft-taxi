import React from 'react';
import getClass from '../../utils/getClass';

import Map from '../../components/map';

class MapPage extends React.Component {
    render() {
        return (
            <section className={getClass("map-page", this.props)}>
                <Map mods="map-page__map"/>
            </section>
        );
    };
}

export default MapPage;
