import { SET_REGISTER } from '../../common/constants/action-types';

export const setRegister = (email, password, name, surname) => ({
    type: SET_REGISTER,
    payload: {
        email,
        password,
        name,
        surname,
    },
});
