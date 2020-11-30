import styled from 'styled-components';

export const AsideLogoContainer = styled.aside`
    width: 34%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background: ${p => p.theme.palette.primary.dark}
`;

export const AsideLogoImage = styled.img`
    display: block;
`;
