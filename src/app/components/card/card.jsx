import React from 'react';
import { CardContainer, CardDate, CardNumber, CardTop } from './style';
import cardLogo  from './card-logo.svg';

const Card = () => (
    <CardContainer>
        <CardTop>
            <img src={`${cardLogo}`} alt="Иконка платежной карты"/>
            <CardDate></CardDate>
        </CardTop>
        <CardNumber></CardNumber>
    </CardContainer>
);

export default Card;
