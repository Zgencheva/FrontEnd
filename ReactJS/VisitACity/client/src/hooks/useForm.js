import { useState } from 'react';

export const useForm = (initalValues, onSubmitRegister) => {
    const [values, setValues] = useState(initalValues);

    const onValueChange = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (onSubmitRegister) {
            onSubmitRegister(values)
        }
    }
    return {
        values,
        onValueChange,
        onSubmit,
    }
}