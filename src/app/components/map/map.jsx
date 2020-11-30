import React from 'react';
import { MapContainer } from './style';
import MapBox from '../map-box';
import mapboxgl from 'mapbox-gl';
import mapData from '../../common/constants/map';

mapboxgl.accessToken = mapData.accessToken;

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = mapData.coords;

        this.mapContainer = undefined;
        this.initializedMap = undefined;
    };

    componentDidMount() {
        this.initMap();
    };

    initMap = () => {
        this.initializedMap = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [this.state.lng, this.state.lat],
            zoom: this.state.zoom
        });

        if (navigator.geolocation) {
            const setCoords = (position) => {
                this.setState({
                    lng: position.coords.longitude,
                    lat: position.coords.latitude,
                });

                this.initializedMap.setCenter([position.coords.longitude, position.coords.latitude]);
            };

            navigator.geolocation.getCurrentPosition(setCoords);
        }
    };

    render() {
        return (
            <MapContainer>
                <MapBox ref={el => this.mapContainer = el} />
            </MapContainer>
        );
    };
}

export default Map;
