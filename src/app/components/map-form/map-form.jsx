import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormContainer } from '../form/style';
import { MapFormContainer, MapFormControl } from './style';
import NativeSelect from '@material-ui/core/NativeSelect';
import Button from '@material-ui/core/Button';
import { setAddress, setRoute } from '../../module/actions/map';

class MapForm extends React.Component {
    state = {
        addressFrom: '',
        addressTo: '',
    };

    componentDidMount() {
        const { setAddress } = this.props;
        setAddress();
    }

    handleChangeFrom = (event) => {
        this.setState({ addressFrom: event.target.value });
    };

    handleChangeTo = (event) => {
        this.setState({ addressTo: event.target.value });
    }

    submit = (e) => {
        e.preventDefault();

        const { setRoute } = this.props;
        setRoute(this.state.addressFrom, this.state.addressTo);
    }

    render() {
        const { addressFrom, addressTo } = this.state;
        const { addressList } = this.props;

        const isDisabled = (!addressFrom.length || !addressTo.length);

        return (
            <MapFormContainer
                data-testid="map-form"
            >
                <FormContainer
                    onSubmit={this.submit}
                >
                    <MapFormControl>
                        <NativeSelect
                            value={addressFrom}
                            name="addressFrom"
                            inputProps={{
                                'aria-label': 'addressFrom',
                                'data-testid': 'select-from',
                            }}
                            onChange={this.handleChangeFrom}
                        >
                            <option
                                value=""
                                disabled
                            >
                                Откуда
                            </option>
                            {addressList.map(address => (
                                <option
                                    data-testid="select-option-from"
                                    key={address}
                                    value={address}
                                    disabled={address === addressTo}
                                >
                                    {address}
                                </option>
                            ))}
                        </NativeSelect>
                    </MapFormControl>
                    <MapFormControl>
                        <NativeSelect
                            value={addressTo}
                            name="addressTo"
                            inputProps={{
                                'aria-label': 'addressTo',
                                'data-testid': 'select-to',
                            }}
                            onChange={this.handleChangeTo}
                        >
                            <option
                                value=""
                                disabled
                            >
                                Куда
                            </option>
                            {addressList.map(address => (
                                <option
                                    data-testid="select-option-to"
                                    key={address}
                                    value={address}
                                    disabled={address === addressFrom}
                                >
                                    {address}
                                </option>
                            ))}
                        </NativeSelect>
                    </MapFormControl>
                    <Button
                        data-testid="map-form-button"
                        variant="contained"
                        type="submit"
                        disabled={isDisabled}
                    >
                        Заказать
                    </Button>
                </FormContainer>
            </MapFormContainer>
        );
    }
}

export default compose(
    connect(
        (state => ({
            addressList: state.mapReducer.addressList,
        })),
        (dispatch => ({
            setAddress: () => dispatch(setAddress()),
            setRoute: (addressFrom, addressTo) => dispatch(setRoute(addressFrom, addressTo)),
        })),
    )
)(MapForm);
