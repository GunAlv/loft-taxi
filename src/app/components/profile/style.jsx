import styled from 'styled-components';

export const ProfileContainer = styled.section`
    display: flex;
    flex-direction: column;
    padding: 20px;
`;

export const ProfileContent = styled.div`
    max-width: 880px;
    width: 100%;
    box-shadow: 0px 10px 20px -5px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    background-color: ${p => p.theme.palette.primary.light};
    margin: auto;
    padding: 50px 44px;
`;

export const ProfileIntro = styled.div`
    text-align: center;
    margin-bottom: 40px;
`;

export const ProfileDescription = styled.p`
    margin: 13px 0 0;
    color: ${p => p.theme.palette.secondary.main};
`;

export const ProfileAction = styled.div`
    max-width: 353px;
    width: 100%;
    margin: 40px auto 0;
`;
