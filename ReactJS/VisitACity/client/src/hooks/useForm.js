import { useState } from 'react';

export const useForm = (initalValues, onSubmitHandler) => {
    const [values, setValues] = useState(initalValues);

    const onValueChange = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(onSubmitHandler);
       if(onSubmitHandler){
        console.log(values);
        onSubmitHandler(values);
       }
    }
    return {
        values,
        onValueChange,
        onSubmit,
    }
}