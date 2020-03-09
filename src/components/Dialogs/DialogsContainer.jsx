/**
 * Created by User-35 on 07.08.2019.
 */
import React from 'react'
import {sendMessageActionCreator, updateNewMessageTextActionCreator} from "../../redux/dialogs_reducer"
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {WithAuthRedirect} from "../../hoc/withAuthRedirect"
import {compose} from "redux";

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
        newMessageText : state.dialogsPage.newMessageText,
        isAuth: state.auth.isAuth
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

export default compose(
    WithAuthRedirect,
    connect(mapStateToProps,mapDispatchToProps)
)(Dialogs)