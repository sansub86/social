import React from 'react';
import Users from "./Users";
import {connect} from "react-redux";
import { follow, unfollow, requestUsers } from "../../redux/users_reducer";
import {compose} from "redux";
import {WithAuthRedirect} from "../../hoc/withAuthRedirect";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsLoading,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from "../../redux/users_selectors";
import {UserType} from "../../types/types";
import {AppStateType} from "../../redux/redux-store";
import Preloader from "../common/Preloader/Preloader";


let mapStateToProps = (state: AppStateType):MapStateProps =>{
    return {
        users: getUsers(state),
        totalUsersCount: getTotalUsersCount(state),
        pageSize: getPageSize(state),
        currentPage: getCurrentPage(state),
        isLoading: getIsLoading(state),
        followingInProgress: getFollowingInProgress(state),
    }
};
type Props = MapStateProps & MapDispatchProps & OwnPropsType
type MapStateProps = {
    currentPage:number
    pageSize: number
    isLoading: boolean
    totalUsersCount: number
    users: Array<UserType>
    followingInProgress: Array<number>
}
type MapDispatchProps = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    requestUsers: (currentPage:number, pageSize:number) => void
}
type OwnPropsType = {
    pageTitle: string
}
class UsersContainer extends React.Component<Props> {
    componentDidMount() {
        this.props.requestUsers(this.props.currentPage, this.props.pageSize);
    }
    onPageChange = (page: number) => {
        this.props.requestUsers(page, this.props.pageSize);
    };
    render() {
        return <div>
            <h2>{this.props.pageTitle}</h2>
            {this.props.isLoading ? <Preloader/>: null}
            <Users onPageChange = {this.onPageChange} {...this.props} />
        </div>

    }
}
export default compose(
    WithAuthRedirect,
    connect<MapStateProps, MapDispatchProps, OwnPropsType, AppStateType>(mapStateToProps, {requestUsers, follow, unfollow})
)(UsersContainer);