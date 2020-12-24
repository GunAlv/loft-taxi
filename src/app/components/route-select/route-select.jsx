import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormContainer } from '../form/style';
import { RouteSelectContainer, RouteSelectControl } from './style';
import NativeSelect from '@material-ui/core/NativeSelect';
import Button from '@material-ui/core/Button';
import { setAddress, setRoute } from '../../module/actions/map';
import { Controller, useForm } from 'react-hook-form';

const propTypes = {
    setAddress: PropTypes.func.isRequired,
    addressList: PropTypes.array.isRequired,
    setRoute: PropTypes.func.isRequired,
};

const RouteSelect = ({ setAddress, addressList, setRoute }) => {
    const { handleSubmit, control, formState, getValues } = useForm({
        mode: 'onChange',
    });

    useEffect(() => {
        setAddress();
    }, []);

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
                                inputProps={{
                                    'aria-label': 'addressFrom',
                                    'data-testid': 'select-from',
                                }}
                                onChange={onChange}
                            >
                                <option
                                    value=""
                                >
                                    Откуда
                                </option>
                                {addressList.map(address => (
                                    <option
                                        data-testid="select-option-from"
                                        key={address}
                                        value={address}
                                        disabled={address === getValues('addressTo')}
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
                                inputProps={{
                                    'aria-label': 'addressTo',
                                    'data-testid': 'select-to',
                                }}
                                onChange={onChange}
                            >
                                <option
                                    value=""
                                >
                                    Куда
                                </option>
                                {addressList.map(address => (
                                    <option
                                        data-testid="select-option-to"
                                        key={address}
                                        value={address}
                                        disabled={address === getValues('addressFrom')}
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

RouteSelect.propTypes = propTypes;

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
