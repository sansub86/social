/**
 * Created by Александр on 09.03.2020.
 */
import React from 'react';
import {reduxForm} from "redux-form";
import {createField, Input} from "../common/FormsControls/FormsControl";
import {required} from "../../utils/validators/validators";
import {login} from "../../redux/auth_reducer";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import style from "./../common/FormsControls/FormsControl.module.css"

const LoginForm = ({handleSubmit, error, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField(Input, "email", "Email", [required])}
            {createField(Input, "password", "password", [required], {type: "password"})}
            {createField(Input, "rememberMe", null, null, {type: "checkbox"}, "remember Me")}
            {captchaUrl && <img src={captchaUrl} alt='captcha'/>}
            {captchaUrl && createField(Input, "captcha", "Sympols from image", [required], {})}
            {error && <div className={style.summaryError}>
                {error}
            </div>}
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
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
    };
    if(props.isAuth){
       return <Redirect to={'/profile'} />
    }
    return (
        <div>
            <h1>LOGIN</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl = {props.captchaUrl}/>
        </div>
    )
};

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
});

export default connect(mapStateToProps, {login})(Login);