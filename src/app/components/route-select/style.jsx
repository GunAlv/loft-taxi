import styled from 'styled-components';

export const RouteSelectContainer = styled.div`
    background-color: ${p => p.theme.palette.primary.light};
    max-width: 486px;
    width: 100%;
    padding: 36px;
    position: absolute;
    top: 60px;
    left: 60px;
    z-index: 10;
`;

export const RouteSelectControl = styled.div`
    position: relative;
    
    margin-bottom: 20px;

    div {
        width: 100%;
    }
`;
