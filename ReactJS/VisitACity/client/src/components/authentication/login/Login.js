import { useContext, useState } from 'react';
import styles from './Login.module.css';
import { useForm } from '../../../hooks/useForm.js';
import { AuthContext } from '../../../contexts/AuthContext.js';

export const Login = () => {
    const {serverErrors, onUserLogin} = useContext(
        AuthContext
    );
    const { values, onValueChange, onSubmit } = useForm({
        email: '',
        password: ''}, 
        onUserLogin);
    const [errors, setError] = useState({});

    const validateEmail = (e) => {
        setError(state => ({
            ...state,
            [e.target.name]: {
                isInvalid: !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)),
                message: 'Invalid email'
            },
        }));
    };
    const minLength = (e, minValue) => {
        setError(state => ({
            ...state,
            [e.target.name]: {
                isInvalid: e.target.value.length < minValue,
                message: `Input should be at least ${minValue} characters long`
            },

        }))
    }
    return (
        <form onSubmit={onSubmit} className={`${styles.form}`}>
            {serverErrors.login?.isInvalid && <p className="text-danger">{serverErrors.login?.message}</p>}
            <h2>Use a local account to log in.</h2>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input 
                type="email" 
                className="form-control"
                 id="exampleInputEmail1"
                 placeholder="Enter email"
                 aria-describedby="emailHelp"
                 name="email"
                 value={values.email}
                 onChange={onValueChange}
                 onBlur={(e) => validateEmail(e)}/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            {errors.email?.isInvalid &&
                <p className="text-danger">{errors.email?.message}</p>
            }
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input 
                type="password" 
                className="form-control" 
                id="exampleInputPassword1"
                placeholder="Password"
                name="password"
                value={values.password}
                onChange={onValueChange}
                onBlur={(e) => minLength(e, 6)}/>
            </div>
            {errors.password?.isInvalid &&
                <p className="text-danger">{errors.password?.message}</p>
            }
            <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
            </div>
            <button data-testid="submit" type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
}