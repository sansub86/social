/**
 * Created by User-35 on 02.08.2019.
 */
import React from 'react';
import s from './Header.module.css';
import {NavLink} from "react-router-dom";

export type MapStateToPropsType = {
    isAuth: boolean
    login: string | null
}
export type DispatchPropsType = {
    logout: () => void
}
const Header: React.FC<MapStateToPropsType & DispatchPropsType> = (props) =>{
    const onLogout = () => {
        props.logout();
    };
    return(
        <header className={s.header}>
            <img src="logo.jpg" alt="logo"/>
            <div className={s.loginBlock}>
                {props.isAuth ? <div>{props.login} - <button onClick={onLogout}>Logout</button></div>:
                <NavLink to='/login'>Login</NavLink>}
            </div>
        </header>
    );
};

export default Header;
