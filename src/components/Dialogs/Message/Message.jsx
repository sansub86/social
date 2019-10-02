/**
 * Created by User-35 on 07.08.2019.
 */
import React from 'react'
import s from './Message.module.css'

const Message = (props) => {
    return (
        <div className={s.message}>{props.message}</div>
    );
};

export default Message;