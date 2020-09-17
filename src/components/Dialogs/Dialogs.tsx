/**
 * Created by User-35 on 07.08.2019.
 */
import React from 'react'
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import AddMessageForm from "./AddMessageForm/AddMessageForm";
import {InitialStateType} from "../../redux/dialogs_reducer";

type PropsType = {
    sendMessage: (messageText: string) => void
}

export type AddMessageFormValuesType = {
    newMessageText: string
}

const Dialogs: React.FC<InitialStateType & PropsType> = (props) => {
    let addNewMessage = (formData: { newMessageText: string }) => {
        props.sendMessage(formData.newMessageText);
    };

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {
                    props.dialogs.map(d => <DialogItem key={d.id} id={d.id} name={d.name}/>)

                }
            </div>
            <div className="messages">
                <div>
                    {
                        props.messages.map(m => <Message key={m.id} message={m.message} likesCount={m.likesCount}/>)
                    }
                </div>
                <div>
                    <AddMessageForm onSubmit={addNewMessage}/>
                </div>
            </div>
        </div>
    );
};
export default Dialogs;