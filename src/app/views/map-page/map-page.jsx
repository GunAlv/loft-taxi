import React from 'react';

import Map from '../../components/map';
import { MapPageContainer } from './style';
import MapStub from '../../components/map-stub';
import { compose } from 'redux';
import { connect } from 'react-redux';

class MapPage extends React.Component {
    render() {
        return (
            <MapPageContainer>
                {
                    this.props.isCardFilled ? (
                        <Map/>
                    ) : (
                        <MapStub/>
                    )
                }
            </MapPageContainer>
        );
    };
}

export default compose(
    connect(
        (state => ({
            isCardFilled: state.paymentReducer.isFilled,
        })),
        null,
    )
)(MapPage);


