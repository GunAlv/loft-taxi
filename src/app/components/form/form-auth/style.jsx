import styled from 'styled-components';
import { FormBlock, FormRow } from '../style';

export const FormAuthBlock = styled(FormBlock)`
    margin-top: 40px;
`;

export const FormAuthRow = styled(FormRow)`
    margin-top: 20px;
    
    &:first-child {
        margin-top: 0;
    }
`;

export const FormAuthRowLink = styled.div`
    margin-top: 10px;
    text-align: right;
`;

export const FormAuthRowAction = styled.div`
    margin-top: 44px;
`;

export const FormAuthRowNotice = styled.div`
    text-align: center;
    margin-top: 30px;
    
    && span {
        margin: 0;
        color: #828282;
        margin-right: 4px;
        font-size: 16px;
        line-height: 19px;
    }
`;
