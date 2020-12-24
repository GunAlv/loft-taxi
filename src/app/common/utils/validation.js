export const isEmailValid = val => /.+@.+\..+$/.test(val);

export const isOnlyLetters = val => /^[a-zA-Z-А-Я\s]*$/i.test(val);
