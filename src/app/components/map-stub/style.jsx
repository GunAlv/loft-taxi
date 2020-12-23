import styled from 'styled-components';

export const MapStubContainer = styled.div`
    background: ${p => p.theme.palette.primary.light};
    padding: 70px;
    text-align: center;
    max-width: 600px;
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
`;
