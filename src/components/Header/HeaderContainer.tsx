/**
 * Created by User-35 on 21.02.2020.
 */
import React from 'react';
import Header, {DispatchPropsType, MapStateToPropsType} from "./Header";
import {connect} from "react-redux";
import {logout} from "../../redux/auth_reducer";
import {AppStateType} from "../../redux/redux-store";

class HeaderContainer extends React.Component<MapStateToPropsType & DispatchPropsType> {
    render() {
        return <Header {...this.props}/>
    }
}

const mapStateToProps = (state: AppStateType) => ({
        isAuth: state.auth.isAuth,
        login: state.auth.login
});

export default connect<MapStateToPropsType, DispatchPropsType, {}, AppStateType>(
    mapStateToProps,
    {logout})(HeaderContainer);