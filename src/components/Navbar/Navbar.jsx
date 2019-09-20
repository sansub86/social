/**
 * Created by User-35 on 02.08.2019.
 */
import React from 'react';
import classes from './Navbar.module.css';
import {NavLink} from "react-router-dom";

const Navbar = () => {
    return (
        <nav className={classes.nav}>
            <div className={`${classes.item}`}>
                <NavLink to="/profile" activeClassName={classes.active}>Profile</NavLink>
            </div>
            <div className={`${classes.item}`}>
                <NavLink to="/dialogs" activeClassName={classes.active}>Messages</NavLink>
            </div>
            <div className={classes.item}>
                <NavLink to="/news">News</NavLink>
            </div>
            <div className={classes.item}>
                <NavLink to="/music">Music</NavLink>
            </div>
            <div className={classes.item}>
                <NavLink to="/settings">Settings</NavLink>
            </div>
        </nav>
    );
};
export default Navbar;