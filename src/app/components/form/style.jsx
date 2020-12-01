import styled from 'styled-components';

export const FormContainer = styled.form`
    width: 100%;
`;

export const FormBody = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

export const FormRow = styled.div`
    display: flex;
    margin-top: 26px;
    margin-left: -35px;
    
    &:first-child {
        margin-top: 0;
    }
    
    > div {
        margin-left: 35px;
    }
`;
