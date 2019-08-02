/**
 * Created by User-35 on 02.08.2019.
 */
import React from 'react';
import classes from './Navbar.module.css';

const Navbar = () => {
    return (
        <nav className={classes.nav}>
            <div className={classes.item}>
                <a>Profile</a>
            </div>
            <div className={classes.item}>
                <a>Messages</a>
            </div>
            <div className={classes.item}>
                <a>News</a>
            </div>
            <div>
                <a>Music</a>
            </div>
            <div>
                <a>Settings</a>
            </div>
        </nav>
    );
};
export default Navbar;