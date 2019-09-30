/**
 * Created by User-35 on 07.08.2019.
 */
import React from 'react'
import s from './Dialogs.module.css'
import {NavLink} from "react-router-dom";

const Dialogs = (props) => {
    return(
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                <div className={s.dialog}>
                    <NavLink to="/dialogs/1">Sasha</NavLink>
                </div>
                <div className={s.dialog}>
                    <NavLink to="/dialogs/2">Ivan</NavLink>
                </div>
                <div className={s.dialog}>
                    <NavLink to="/dialogs/3">Sergey</NavLink>
                </div>
            </div>
            <div className="messages">
                <div className="message">Hi</div>
                <div className="message">What is your name</div>
                <div className="message">Yo!</div>
            </div>
        </div>
    );
};

export default Dialogs;