import registerReducer from '../../module/reducers/register-reducer';
import { GET_REGISTER_ERROR } from '../../common/constants/action-types';

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

   it('Should handle GET_REGISTER_ERROR', () => {
       expect(
           registerReducer(undefined, {
               type: GET_REGISTER_ERROR,
               payload: 'Вот опять ошибка',
           }))
           .toEqual({
               ...initialState,
               registerError: 'Вот опять ошибка',
           })
   });
});
