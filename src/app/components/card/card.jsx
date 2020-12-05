import React from 'react';
import PropTypes from 'prop-types';
import { CardContainer, CardDate, CardNumber, CardTop } from './style';
import cardLogo  from './card-logo.svg';

const propTypes = {
    number: PropTypes.string,
    date: PropTypes.string,
};

const defaultProps = {
    number: 'Номер карты',
    date: 'Срок действия',
};

const Card = ({ number, date }) => (
    <CardContainer>
        <CardTop>
            <img src={cardLogo} alt="Иконка платежной карты"/>
            <CardDate>{date}</CardDate>
        </CardTop>
        <CardNumber>{number}</CardNumber>
    </CardContainer>
);

Card.defaultProps = defaultProps;
Card.propTypes = propTypes;

export default Card;
