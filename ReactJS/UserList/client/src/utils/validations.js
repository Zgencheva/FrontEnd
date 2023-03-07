export const minLength = (e, minValue) => {
    setError(state => ({
        ...state,
        [e.target.name]: {
            isInvalid: e.target.value.length < minValue,
            message: `${e.target.name} should be at least ${minValue} characters long`
        },

    }))
}
export const validateEmail = (e) => {
    setError(state => ({
        ...state,
        [e.target.name]: {
            isInvalid: !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)),
            message: 'Invalid email'
        },
    }));
};
export const validateImageUrl = (e) => {
    setError(state => ({
        ...state,
        [e.target.name]: {
            isInvalid: !(/^https?:\/\/.+/.test(e.target.value)),
            message: 'Invalid image url'
        },
    }));
};
export const validatePhoneNumber = (e) => {
    setError(state => ({
        ...state,
        [e.target.name]: {
            isInvalid: !(/^0[1-9]{1}[0-9]{8}$/.test(e.target.value)),
            message: 'Phone number should start with 0 and should be 10 characters long!'
        },
    }));
};

export const positiveNumberValidation  = (e, stretNum) => {
    setError(state => ({
        ...state,
        [e.target.name]: {
            isInvalid: Number(e.target.value) <0,
            message: 'Street number should be a positive number!'
        },
    }));
};