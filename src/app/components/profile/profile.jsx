import React from 'react';
import { Title } from '../title/style';
import { FormBody, FormContainer, FormRow } from '../form/style';
import { StyledTextField } from '../text-field/style';
import { Button } from '@material-ui/core';
import Card from '../card/card';
import { ProfileAction, ProfileContainer, ProfileDescription, ProfileIntro } from './style';
import { FormPaymentInner } from '../form/form-payment/style';

class Profile extends React.Component {
    render() {
        return (
            <ProfileContainer>
                <ProfileIntro>
                    <Title variant="h1" component="h1">
                        Профиль
                    </Title>
                    <ProfileDescription>
                        Введите платежные данные
                    </ProfileDescription>
                </ProfileIntro>

                <FormContainer>
                    <FormBody>
                        <FormPaymentInner>
                            <FormRow>
                                <StyledTextField
                                    type="text"
                                    name="payment-name"
                                    id="payment-name"
                                    label="Имя владельца"
                                />
                            </FormRow>
                            <FormRow>
                                <StyledTextField
                                    type="text"
                                    name="payment-card"
                                    id="payment-card"
                                    label="Номер карты"
                                />
                            </FormRow>
                            <FormRow>
                                <StyledTextField
                                    type="text"
                                    name="payment-date"
                                    id="payment-date"
                                    label="MM/YY"
                                />
                                <StyledTextField
                                    type="text"
                                    name="payment-cvc"
                                    id="payment-cvc"
                                    label="CVC"
                                />
                            </FormRow>
                        </FormPaymentInner>

                        <Card/>

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
            </ProfileContainer>
        );
    }
}

export default Profile;
