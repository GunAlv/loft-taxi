import React from 'react';
import { Title } from '../title/style';
import { FormBody, FormContainer, FormRow } from '../form/style';
import { StyledTextField } from '../text-field/style';
import { Button } from '@material-ui/core';
import Card from '../card/card';
import { ProfileAction, ProfileContainer, ProfileDescription, ProfileIntro } from './style';
import { FormPaymentInner } from '../form/form-payment/style';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { pushPayment, paymentSuccessInfoDisable } from '../../module/actions/payment';

const NUMBER_LIMIT = 19;
const DATE_LIMIT = 5;

class Profile extends React.Component {
    state = {
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvc: '',
    };

    componentDidMount() {
        const { card } = this.props;

        this.setState({ ...card })
    }

    submit = (e) => {
        const { token, pushPayment } = this.props;

        e.preventDefault();

        const cardName = e.target['payment-name'].value;
        const expiryDate = e.target['payment-date'].value;
        const cardNumber = e.target['payment-number'].value;
        const cvc = e.target['payment-cvc'].value;

        if (
            cardNumber.length &&
            expiryDate.length &&
            cardNumber.length &&
            cvc.length
        ) {
            pushPayment(cardNumber, expiryDate, cardName, cvc, token);
        }
    };

    changeName = (e) => {
        this.setState({
            cardName: e.target.value
        });
    };

    changeNumber = (e) => {
        if (e.target.value.length <= NUMBER_LIMIT) {
            this.setState({
                cardNumber: e.target.value.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim(),
            });
        }
    };

    changeDate = (e) => {
        let modifiedValue = e.target.value;

        if (modifiedValue.length <= DATE_LIMIT) {
            if (modifiedValue.length === 2) {
                modifiedValue += '/';
            }

            this.setState({
                expiryDate: modifiedValue,
            });
        }
    };

    changeCVC = (e) => {
        if (e.target.value.length <= 3) {
            this.setState({
                cvc: e.target.value,
            });
        }
    };

    removeSuccessInfo = () => {
        const { paymentSuccessInfoDisable } = this.props;
        paymentSuccessInfoDisable();
    };

    render() {
        const { cardName, cardNumber, expiryDate, cvc } = this.state;
        const { showSuccessInfo } = this.props;

        return (
            <ProfileContainer>
                <ProfileIntro>
                    <Title variant="h1" component="h1">
                        Профиль
                    </Title>
                    <ProfileDescription>
                        {
                            showSuccessInfo
                                ? 'Платёжные данные обновлены. Теперь вы можете заказывать такси.'
                                : 'Введите платежные данные'
                        }
                    </ProfileDescription>
                </ProfileIntro>

                {
                    showSuccessInfo ? (
                        <ProfileAction>
                            <Button
                                variant="contained"
                                onClick={this.removeSuccessInfo}
                            >
                                Перейти на карту
                            </Button>
                        </ProfileAction>
                    ) : (
                        <FormContainer onSubmit={this.submit}>
                            <FormBody>
                                <FormPaymentInner>
                                    <FormRow>
                                        <StyledTextField
                                            type="text"
                                            name="payment-name"
                                            id="payment-name"
                                            label="Имя владельца"
                                            value={cardName}
                                            onChange={this.changeName}
                                        />
                                    </FormRow>
                                    <FormRow>
                                        <StyledTextField
                                            type="text"
                                            name="payment-number"
                                            id="payment-number"
                                            label="Номер карты"
                                            value={cardNumber}
                                            onChange={this.changeNumber}
                                        />
                                    </FormRow>
                                    <FormRow>
                                        <StyledTextField
                                            type="text"
                                            name="payment-date"
                                            id="payment-date"
                                            label="MM/YY"
                                            value={expiryDate}
                                            onChange={this.changeDate}
                                        />
                                        <StyledTextField
                                            type="text"
                                            name="payment-cvc"
                                            id="payment-cvc"
                                            label="CVC"
                                            value={cvc}
                                            onChange={this.changeCVC}
                                        />
                                    </FormRow>
                                </FormPaymentInner>

                                <Card
                                    number={cardNumber}
                                    date={expiryDate}
                                />

                                <ProfileAction>
                                    <Button
                                        variant="contained"
                                        type="submit"
                                    >
                                        Сохранить
                                    </Button>
                                </ProfileAction>
                            </FormBody>
                        </FormContainer>
                    )
                }
            </ProfileContainer>
        );
    }
}

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
