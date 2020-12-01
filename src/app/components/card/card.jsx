import React from 'react';
import { CardContainer, CardDate, CardNumber, CardTop } from './style';
import cardLogo  from './card-logo.svg';

const Card = ({ number, date }) => (
    <CardContainer>
        <CardTop>
            <img src={`${cardLogo}`} alt="Иконка платежной карты"/>
            <CardDate>{date}</CardDate>
        </CardTop>
        <CardNumber>{number}</CardNumber>
    </CardContainer>
);

export default Card;
