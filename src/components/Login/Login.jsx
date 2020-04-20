/**
 * Created by Александр on 09.03.2020.
 */
import React from 'react';
import {Field, reduxForm} from "redux-form";
import {Input} from "../common/FormsControls/FormsControl";
import {required} from "../../utils/validators/validators";
import {login} from "../../redux/auth_reducer";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Input} name={'email'} placeholder={'Email'} validate={[required]}/>
            </div>
            <div>
                <Field component={Input} name={'password'} placeholder={'password'} validate={[required]}/>
            </div>
            <div>
                <Field component={Input} type={'checkbox'} name={'rememberMe'}/>remember Me
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
        props.login(formData.email, formData.password, formData.rememberMe);
    };
    if(props.isAuth){
       return <Redirect to={'/profile'} />
    }
    return (
        <div>
            <h1>LOGIN</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    )
};

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
});

export default connect(mapStateToProps, {login})(Login);