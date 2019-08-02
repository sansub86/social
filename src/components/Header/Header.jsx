/**
 * Created by User-35 on 02.08.2019.
 */
import React from 'react';
import s from './Header.module.css';

const Header = () =>{
    return(
        <header className={s.header}>
            <img src="logo.jpg" alt="logo"/>
        </header>
    );
};
export default Header;
