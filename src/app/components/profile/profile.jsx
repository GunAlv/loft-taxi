import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Title } from '../title/style';
import { FormBody, FormContainer, FormRow } from '../form/style';
import { StyledTextField } from '../text-field/style';
import { Button } from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import { format, parse } from 'date-fns'
import ProfileUpdateMessage from '../profile-update-message';
import Card from '../card/card';
import { ProfileAction, ProfileContainer, ProfileContent, ProfileDescription, ProfileIntro } from './style';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { pushPayment, paymentSuccessInfoDisable } from '../../module/actions/payment';
import { Controller, useForm } from 'react-hook-form';

const propTypes = {
    card: PropTypes.shape({
        cardNumber: PropTypes.string,
        cardName: PropTypes.string,
        expiryDate: PropTypes.string,
        cvc: PropTypes.string,
    }).isRequired,
    token: PropTypes.string.isRequired,
    showSuccessInfo: PropTypes.bool,
    pushPayment: PropTypes.func.isRequired,
    paymentSuccessInfoDisable: PropTypes.func.isRequired,
};

const defaultProps = {
    showSuccessInfo: false,
};

function normalizeCardNumber(value) {
    return value.replace(/\s/g, '').match(/.{1,4}/g)?.join(' ').substr(0, 19) || '';
}

const Profile = ({ card, token, showSuccessInfo, pushPayment, paymentSuccessInfoDisable }) => {
    const [state, setState] = useState({
        cardNumber: '',
        expiryDate: '',
        formattedDate: '',
    });

    const modifiedDate = card.expiryDate.length > 0 ? parse(card.expiryDate, 'MM/yy', new Date()).toString() : '';

    useEffect(() => {
        setValue('payment-name', card.cardName, { shouldValidate: true });
        setValue('payment-number', card.cardNumber, { shouldValidate: true });
        setValue('payment-cvc', card.cvc, { shouldValidate: true });
        setValue('payment-date', modifiedDate, { shouldValidate: true });

        setState(prevState => ({
            ...prevState,
            cardNumber: card.cardNumber,
            expiryDate: modifiedDate,
            formattedDate: card.expiryDate,
        }));
    }, []);

    const { handleSubmit, register, control, setValue, formState } = useForm({
        mode: 'onChange',
    });

    const submit = (data) => {
        const cardName = data['payment-name'];
        const expiryDate = data['payment-date'];
        const cardNumber = data['payment-number'];
        const cvc = data['payment-cvc'];

        pushPayment(cardNumber, expiryDate, cardName, cvc, token);
    };

    const onNameChange = (e) => {
        e.target.value = e.target.value.replace(/[0-9]/g, '');
    };

    const onNumberChange = (e) => {
        e.target.value = normalizeCardNumber(e.target.value);

        setState(prevState => ({
            ...prevState,
            cardNumber: e.target.value,
        }));
    };

    const onDateChange = (date, formattedDate) => {
        setState(prevState => ({
            ...prevState,
            expiryDate: date.toString(),
            formattedDate,
        }));
    };

    const onCvcChange = (e) => {
        e.target.value = e.target.value.replace(/[^0-9.]/g, '');
    };

    return (
        <ProfileContainer
            data-testid="profile"
        >
            <ProfileContent>
                {
                    showSuccessInfo ? (
                        <ProfileUpdateMessage
                            removeSuccessInfo={paymentSuccessInfoDisable}
                        />
                    ) : (
                        <>
                            <ProfileIntro>
                                <Title variant="h1" component="h1">
                                    Профиль
                                </Title>
                                <ProfileDescription>
                                    Введите платежные данные
                                </ProfileDescription>
                            </ProfileIntro>

                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <FormContainer
                                    data-testid="profile-form"
                                    onSubmit={handleSubmit(submit)}
                                >
                                    <FormBody>
                                        <div>
                                            <FormRow>
                                                <StyledTextField
                                                    type="text"
                                                    label="Имя владельца"
                                                    name="payment-name"
                                                    id="payment-name"
                                                    inputRef={register({
                                                        required: true,
                                                    })}
                                                    inputProps={{
                                                        'data-testid': "profile-form-name"
                                                    }}
                                                    onChange={onNameChange}
                                                />
                                            </FormRow>
                                            <FormRow>
                                                <StyledTextField
                                                    type="text"
                                                    name="payment-number"
                                                    id="payment-number"
                                                    label="Номер карты"
                                                    defaultValue={state.cardNumber}
                                                    inputRef={register({
                                                        required: true,
                                                    })}
                                                    inputProps={{
                                                        'data-testid': "profile-form-number"
                                                    }}
                                                    onChange={onNumberChange}
                                                />
                                            </FormRow>
                                            <FormRow>
                                                <Controller
                                                    control={control}
                                                    name="payment-date"
                                                    id="payment-date"
                                                    rules={{ required: true }}
                                                    render={({ onChange }) => (
                                                        <DatePicker
                                                            autoOk={true}
                                                            variant="inline"
                                                            format="MM/yy"
                                                            value={state.expiryDate.length > 0 ? state.expiryDate : null}
                                                            label="MM/YY"
                                                            views={["month", "year"]}
                                                            onChange={(date) => {
                                                                const formattedDate = format(date, 'MM/yy');
                                                                onChange(formattedDate);
                                                                onDateChange(date, formattedDate);
                                                            }}
                                                            inputProps={{
                                                                'data-testid': "profile-form-date"
                                                            }}
                                                            error={false}
                                                            helperText={null}
                                                        />
                                                    )}
                                                />
                                                <StyledTextField
                                                    type="text"
                                                    name="payment-cvc"
                                                    id="payment-cvc"
                                                    label="CVC"
                                                    inputRef={register({
                                                        required: true,
                                                    })}
                                                    InputProps={{
                                                        inputProps: {
                                                            'data-testid': "profile-form-cvc",
                                                            maxLength: 3,
                                                        }
                                                    }}
                                                    onChange={onCvcChange}
                                                />
                                            </FormRow>
                                        </div>

                                        <Card
                                            number={state.cardNumber}
                                            date={state.formattedDate}
                                        />

                                        <ProfileAction>
                                            <Button
                                                variant="contained"
                                                type="submit"
                                                disabled={!formState.isValid}
                                            >
                                                Сохранить
                                            </Button>
                                        </ProfileAction>
                                    </FormBody>
                                </FormContainer>
                            </MuiPickersUtilsProvider>
                        </>
                    )
                }
            </ProfileContent>
        </ProfileContainer>
    );
}

Profile.propTypes = propTypes;
Profile.defaultProps = defaultProps;

export default compose(
    connect(
        (state => ({
            token: state.authReducer.token,
            card: state.paymentReducer.card,
            showSuccessInfo: state.paymentReducer.showSuccessInfo,
        })),
        (dispatch => ({
            pushPayment: (cardNumber, expiryDate, cardName, cvc, token) => dispatch(pushPayment(cardNumber, expiryDate, cardName, cvc, token)),
            paymentSuccessInfoDisable: () => dispatch(paymentSuccessInfoDisable()),
        })),
    ),
)(Profile);
