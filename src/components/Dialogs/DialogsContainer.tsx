/**
 * Created by User-35 on 07.08.2019.
 */
import {actions} from "../../redux/dialogs_reducer"
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {WithAuthRedirect} from "../../hoc/withAuthRedirect"
import {compose} from "redux";
import {AppStateType} from "../../redux/redux-store";

const mapStateToProps = (state: AppStateType) => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages,
  //      newMessageText : state.dialogsPage.newMessageText,
        isAuth: state.auth.isAuth
    }
};

export default compose<React.FC>(
    WithAuthRedirect,
    connect(mapStateToProps,{...actions})
)(Dialogs)