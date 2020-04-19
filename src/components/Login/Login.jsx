/**
 * Created by Александр on 09.03.2020.
 */
import React from 'react';
import {Field, reduxForm} from "redux-form";

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={'input'} name={'login'} placeholder={'login'}/>
            </div>
            <div>
                <Field component={'input'} name={'password'} placeholder={'password'}/>
            </div>
            <div>
                <Field component={'input'} type={'checkbox'} name={'rememberMe'}/> remember Me
            </div>
            <div>
                <button>Submit</button>
            </div>
        </form>
    )
};
const LoginReduxForm = reduxForm({
    form: 'login'
})(LoginForm);
const Login = (props) => {
    const onSubmit = (formData) =>{
        console.log(formData);
    };
    return (
        <div>
            <h1>LOGIN</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    )
};

export default Login;