/**
 * Created by User-35 on 19.02.2020.
 */
import React from 'react'
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatus, getUserProfile, updateStatus, savePhoto, saveProfile} from "../../redux/profile_reducer";
import {withRouter} from "react-router-dom";
import {WithAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

class ProfileContainer extends React.Component {
    refreshUserProfile() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = 5902;
        }
        this.props.getUserProfile(userId);
        this.props.getStatus(userId);
    }
    componentDidUpdate(prevProps, prevState){
        if(this.props.match.params.userId !== prevProps.match.params.userId){
            this.refreshUserProfile();
        }
    }
    componentDidMount() {
       this.refreshUserProfile();
    }

    render() {
        return <Profile {...this.props} profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateStatus} isOwner={!this.props.match.params.userId} savePhoto={this.props.savePhoto} saveProfile = {this.props.saveProfile}/>
    }
}
let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        isAuth: state.auth.isAuth,
        status: state.profilePage.status,
        autorizedUserId: state.auth.userId,
    }
};

export default compose(
    WithAuthRedirect,
    withRouter,
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile})
)(ProfileContainer);

