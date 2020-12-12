import React from 'react';
import { MapContainer } from './style';
import MapForm from '../map-form';
import MapBox from '../map-box';
import mapboxgl from 'mapbox-gl';
import mapData from '../../common/constants/map';
import { compose } from 'redux';
import { connect } from 'react-redux';

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

    componentWillUnmount() {
        if (this.initializedMap) {
            this.initializedMap.remove();
        }
    }

    componentDidUpdate(prevProps) {
        const { routeCoords } = this.props;
        const { routeCoords: prevRouteCoords } = prevProps;

        if ((routeCoords !== prevRouteCoords) && this.initializedMap) {
            this.drawRoute(this.initializedMap, routeCoords);
        }
    }

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

    drawRoute = (map, coordinates) => {
        if (map.getLayer('route')) {
            map.removeLayer('route');
            map.removeSource('route');
        }

        map.flyTo({
            center: coordinates[0],
            zoom: 15
        });

        map.addLayer({
            id: 'route',
            type: 'line',
            source: {
                type: 'geojson',
                data: {
                    type: 'Feature',
                    properties: {},
                    geometry: {
                        type: 'LineString',
                        coordinates
                    }
                }
            },
            layout: {
                'line-join': 'round',
                'line-cap': 'round'
            },
            paint: {
                'line-color': '#ffc617',
                'line-width': 8
            },
        });
    }

    render() {
        return (
            <MapContainer>
                <MapForm
                    drawRoute={this.drawRoute}
                />
                <MapBox ref={el => this.mapContainer = el} />
            </MapContainer>
        );
    };
}
export default compose(
    connect(
        (state => ({
            routeCoords: state.mapReducer.routeCoords,
        })),
        null,
    )
)(Map);
