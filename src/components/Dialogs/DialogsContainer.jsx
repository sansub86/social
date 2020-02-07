/**
 * Created by User-35 on 07.08.2019.
 */
import React from 'react'
import {sendMessageActionCreator, updateNewMessageTextActionCreator} from "../../redux/dialogs_reducer"
import Dialogs from "./Dialogs";
import {connect} from "react-redux";

/*
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
*/

let mapStateToProps = (state) => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages,
        newMessageText : state.dialogsPage.newMessageText
    }
};
let mapDispatchToProps = (dispatch) => {
    return {
        addMessage: () => {
            dispatch(sendMessageActionCreator());
        },
        updateText: (text) => {
            dispatch(updateNewMessageTextActionCreator(text))
        }
    }
};

const DialogsContainer = connect(mapStateToProps,mapDispatchToProps)(Dialogs);

export default DialogsContainer;