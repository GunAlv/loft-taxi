import styled from 'styled-components';
import mainBg from './main.jpg';

export const Container = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
`;

export const Main = styled.main`
    background-image: url(${mainBg});
    background-repeat: no-repeat;
    background-size: cover;
    height: 100%;
    display: flex;
    flex-direction: column;
`;
