import styled from 'styled-components';
import cardIcon_1 from './card-icon-1.svg';
import cardIcon_2 from './card-icon-2.svg';

export const CardContainer = styled.div`
    box-shadow: 0px 5px 20px 2px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    max-width: 347px;
    width: 100%;
    padding: 18px 16px 75px 24px;
    background-color: ${p => p.theme.palette.primary.light};
    align-self: flex-start;
    margin-left: auto;
    position: relative;
    min-height: 182px;
    
    &::before,
    &::after {
        position: absolute;
        content: '';
        background-size: cover;
        bottom: 16px;
    }
    
    &::before {
        width: 29px;
        height: 27px;
        background-image: url(${cardIcon_1});
        left: 24px;
    }
    
    &::after {
        width: 46px;
        height: 28px;
        background-image: url(${cardIcon_2});
        right: 16px;
    }
`;

export const CardTop = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const CardDate = styled.span`
    font-size: 12px;
    line-height: 14px;
`;

export const CardNumber = styled.div`
    font-size: 21px;
    line-height: 25px;
    margin-top: 30px;
`;
