/**
 * Created by User-35 on 21.02.2020.
 */
import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import * as axios from 'axios'
import {setAuthUserData} from "../../redux/auth_reducer";

class HeaderContainer extends React.Component {
    componentDidMount(){
        axios.get('https://social-network.samuraijs.com/api/1.0/auth/me', {withCredentials: true}).then(response => {
            if(response.data.resultCode === 0){
                this.props.setAuthUserData(response.data.data.id, response.data.data.login, response.data.data.email);
            }
        });
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

export default connect(mapStateToProps,{setAuthUserData})(HeaderContainer);