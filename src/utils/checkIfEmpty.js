export const isEmpty = (string) => {
    if (string.trim() === '') return true;
    else return false;
};

export const checkIfEmpty = (passphrase, message) => {
    const errors = {};

    if (isEmpty(passphrase)) {
        errors.passphrase = 'This field is required';
    };

    if (isEmpty(message)) {
        errors.message = 'This field is required';
    };

    const valid = Object.keys(errors).length === 0 ? true : false;

    return { errors, valid };
};

export default checkIfEmpty;