/**
 * Created by User-35 on 19.02.2020.
 */
import React from 'react'
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserProfile} from "../../redux/profile_reducer";
import * as axios from 'axios'
import {withRouter} from "react-router-dom";
import {WithAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = 2;
        }
        this.props.getUserProfile(userId);
    }

    render() {
        return <Profile {...this.props} profile={this.props.profile}/>
    }
}
let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        isAuth: state.auth.isAuth
    }
};

/*
let WithUrlDataContainerComponent = withRouter(ProfileContainer);
*/

export default compose(
    WithAuthRedirect,
    withRouter,
    connect(mapStateToProps, {getUserProfile})
)(ProfileContainer);

/*
export default WithAuthRedirect(connect(mapStateToProps, {getUserProfile})(WithUrlDataContainerComponent))*/
