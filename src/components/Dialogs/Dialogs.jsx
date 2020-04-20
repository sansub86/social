/**
 * Created by User-35 on 07.08.2019.
 */
import React from 'react'
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {Redirect} from "react-router-dom";
import {AddMessageFormRedux} from "./AddMessageForm/AddMessageForm";

const Dialogs = (props) => {
    let sendMessage = (formData) => {
        props.addMessage(formData.addNewMessageText);
    };
    if(!props.isAuth) return <Redirect to={"/login"}/>
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
                    <AddMessageFormRedux onSubmit={sendMessage}/>
                </div>
            </div>
        </div>
    );
};
export default Dialogs;