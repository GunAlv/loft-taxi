import registerReducer from '../../module/reducers/register-reducer';
import { SET_REGISTER_ERROR } from '../../common/constants/action-types';

const initialState = {
    registerError: '',
};

describe('Register Reducer', () => {
   it('Should return the initial state', () => {
       expect(
           registerReducer(undefined, {}))
           .toEqual({
               ...initialState
           })
   });

   it('Should handle SET_REGISTER_ERROR', () => {
       expect(
           registerReducer(undefined, {
               type: SET_REGISTER_ERROR,
               payload: 'Вот опять ошибка',
           }))
           .toEqual({
               ...initialState,
               registerError: 'Вот опять ошибка',
           })
   });
});
