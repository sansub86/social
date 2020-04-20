/**
 * Created by User-35 on 07.08.2019.
 */
import React from 'react'
import {sendMessageActionCreator} from "../../redux/dialogs_reducer"
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {WithAuthRedirect} from "../../hoc/withAuthRedirect"
import {compose} from "redux";

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
        addMessage: (messageText) => {
            dispatch(sendMessageActionCreator(messageText));
        }
    }
};

export default compose(
    WithAuthRedirect,
    connect(mapStateToProps,mapDispatchToProps)
)(Dialogs)