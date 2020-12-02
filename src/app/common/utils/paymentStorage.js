import { LOFT_TAXI_PAYMENT_STORAGE } from '../constants/loft-taxi-payment-storage'

export const setPaymentStorage = (paymentInfo) => {
    return localStorage.setItem(LOFT_TAXI_PAYMENT_STORAGE, JSON.stringify({
        ...paymentInfo
    }));
};

export const getFromPaymentStorage = (value) => {
    const storage = JSON.parse(localStorage.getItem(LOFT_TAXI_PAYMENT_STORAGE));
    return storage ? storage[value] : undefined;
};
