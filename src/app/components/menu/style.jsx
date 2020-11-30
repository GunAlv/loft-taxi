import styled from 'styled-components';
import { Link } from '@material-ui/core';

export const MenuContainer = styled.nav`
    display: flex;
    align-items: center;
`;

export const MenuList = styled.ul`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    list-style: none;
    padding: 0;
`;

export const MenuListItem = styled.li`
    margin-right: 25px;
`;

export const MenuLink = styled(Link)`
    font-size: 21px;
    line-height: 25px;
    color: ${p => p.theme.palette.primary.light};
`;
