/**
 * Created by User-35 on 07.08.2019.
 */
import React from 'react'
import s from './Dialogs.module.css'
import {NavLink} from "react-router-dom";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";

const Dialogs = (props) => {
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {
                    props.dialogs.map(d => <DialogItem id={d.id} name={d.name}/>)
                }
            </div>
            <div className="messages">
                {
                    props.messages.map(m => <Message message={m.message} likesCount={m.likesCount}/>)
                }
            </div>
        </div>
    );
};

export default Dialogs;