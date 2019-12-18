/**
 * Created by User-35 on 07.08.2019.
 */
import React from 'react'
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {sendMessageActionCreator, updateNewMessageTextActionCreator} from "../../redux/dialogs_reducer"

const Dialogs = (props) => {
    debugger;
    let textMessage = React.createRef();
    let changeText = () => {
        let text = textMessage.current.value;
        props.updateText(text);
    };
    let sendMessage = () => {
        props.addMessage();
    };
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {
                    props.dialogs.map(d => <DialogItem id={d.id} name={d.name}/>)
                }
            </div>
            <div className="messages">
                <div>
                    {
                        props.messages.map(m => <Message message={m.message} likesCount={m.likesCount}/>)
                    }
                </div>
                <div>
                    <div><textarea ref={textMessage} value={props.newMessageText} onChange={changeText}></textarea></div>
                    <div><button onClick={sendMessage}>Отправить</button></div>
                </div>
            </div>
        </div>
    );
};

export default Dialogs;