/**
 * Created by Александр on 09.03.2020.
 */
import React from 'react';
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, GetStringKeys, Input} from "../common/FormsControls/FormsControl";
import {required} from "../../utils/validators/validators";
import {login} from "../../redux/auth_reducer";
import {connect, useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import style from "./../common/FormsControls/FormsControl.module.css"
import {AppStateType} from "../../redux/redux-store";

type LoginFormOwnProps = {
    captchaUrl: string | null
}
export type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}
type LoginFormValuesTypeKeys = GetStringKeys<LoginFormValuesType>

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType,LoginFormOwnProps> & LoginFormOwnProps> = ({handleSubmit, error, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField<LoginFormValuesTypeKeys>(Input, "email", "Email", [required])}
            {createField<LoginFormValuesTypeKeys>(Input, "password", "password", [required], {type: "password"})}
            {createField<LoginFormValuesTypeKeys>(Input, "rememberMe", undefined, [], {type: "checkbox"}, "remember Me")}
            {captchaUrl && <img src={captchaUrl} alt='captcha'/>}
            {captchaUrl && createField<LoginFormValuesTypeKeys>(Input, "captcha", "Sympols from image", [required], {})}
            {error && <div className={style.summaryError}>
                {error}
            </div>}
            <div>
                <button>Submit</button>
            </div>
        </form>
    )
};
const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({
    form: 'login'
})(LoginForm);
type MapStatePropsType = {
    captchaUrl: string | null
    isAuth: boolean
}
type MapDispatchPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void

}

export const Login: React.FC = (props) => {
    const isAuth = useSelector((state:AppStateType) => state.auth.isAuth);
    const captchaUrl = useSelector((state:AppStateType) => state.auth.captchaUrl);
    const dispatch = useDispatch();
    const onSubmit = (formData: any) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha));
    };
    if (isAuth) {
        return <Redirect to={'/profile'}/>
    }
    return (
        <div>
            <h1>LOGIN</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
        </div>
    )
};
