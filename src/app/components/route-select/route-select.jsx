import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormContainer } from '../form/style';
import { RouteSelectContainer, RouteSelectControl } from './style';
import NativeSelect from '@material-ui/core/NativeSelect';
import Button from '@material-ui/core/Button';
import { setAddress, setRoute } from '../../module/actions/map';
import { Controller, useForm } from 'react-hook-form';

const RouteSelect = ({ setAddress, addressList, setRoute }) => {
    const [state, setState] = useState({
        addressFrom: '',
        addressTo: '',
    });

    const methods = useForm({
        mode: 'onChange',
    });

    const { handleSubmit, control, formState } = methods;

    useEffect(() => {
        setAddress();
    }, []);

    const handleChangeFrom = (event) => {
        setState(prevState => ({
            ...prevState,
            addressFrom: event.target.value,
        }));
    };

    const handleChangeTo = (event) => {
        setState(prevState => ({
            ...prevState,
            addressTo: event.target.value,
        }));
    }

    const submit = (data) => {
        setRoute(data.addressFrom, data.addressTo);
    }

    return (
        <RouteSelectContainer
            data-testid="route-select"
        >
            <FormContainer onSubmit={handleSubmit(submit)}>
                <RouteSelectControl>
                    <Controller
                        control={control}
                        name="addressFrom"
                        rules={{ required: true }}
                        render={({ onChange }) => (
                            <NativeSelect
                                value={state.addressFrom}
                                inputProps={{
                                    'aria-label': 'addressFrom',
                                    'data-testid': 'select-from',
                                }}
                                onChange={(e) => {
                                    onChange(e);
                                    handleChangeFrom(e);
                                }}
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
                                        disabled={address === state.addressTo}
                                    >
                                        {address}
                                    </option>
                                ))}
                            </NativeSelect>
                        )}
                    />
                </RouteSelectControl>
                <RouteSelectControl>
                    <Controller
                        control={control}
                        name="addressTo"
                        rules={{ required: true }}
                        render={({ onChange }) => (
                            <NativeSelect
                                value={state.addressTo}
                                name="addressTo"
                                inputProps={{
                                    'aria-label': 'addressTo',
                                    'data-testid': 'select-to',
                                }}
                                onChange={(e) => {
                                    onChange(e);
                                    handleChangeTo(e);
                                }}
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
                                        disabled={address === state.addressFrom}
                                    >
                                        {address}
                                    </option>
                                ))}
                            </NativeSelect>
                        )}
                    />
                </RouteSelectControl>
                <Button
                    data-testid="route-select-button"
                    variant="contained"
                    type="submit"
                    disabled={!formState.isValid}
                >
                    Заказать
                </Button>
            </FormContainer>
        </RouteSelectContainer>
    );
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
)(RouteSelect);
