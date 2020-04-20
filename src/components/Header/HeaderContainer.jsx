/**
 * Created by User-35 on 21.02.2020.
 */
import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import * as axios from 'axios'
import {getAuthUserData, logout} from "../../redux/auth_reducer";

class HeaderContainer extends React.Component {
    componentDidMount(){
        this.props.getAuthUserData();
    };

    render() {
        return <Header {...this.props}/>
    }
}

let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login
    }
};

export default connect(mapStateToProps,{getAuthUserData, logout})(HeaderContainer);