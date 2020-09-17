/**
 * Created by User-35 on 07.08.2019.
 */
import React from 'react'
import s from './Message.module.css'
type PropsType = {
    message: string
    likesCount: number
}
const Message: React.FC<PropsType> = (props) => {
    return (
        <div className={s.message}>{props.message} <span>Likes: {props.likesCount}</span></div>

    );
};

export default Message;