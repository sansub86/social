/**
 * Created by User-35 on 07.08.2019.
 */
import React from 'react'
import {sendMessageActionCreator, updateNewMessageTextActionCreator} from "../../redux/dialogs_reducer"
import Dialogs from "./Dialogs";

const DialogsContainer = (props) => {

    let state = props.store.getState();
    let changeText = (text) => {
        props.store.dispatch(updateNewMessageTextActionCreator(text));
    };
    let sendMessage = () => {
        props.store.dispatch(sendMessageActionCreator());
    };
    return <Dialogs dialogs = {state.dialogsPage.dialogs} messages = {state.dialogsPage.messages} addMessage = {sendMessage} updateText = {changeText}/>
};

export default DialogsContainer;