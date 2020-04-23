import React from 'react';
import Users from "./Users";
import {connect} from "react-redux";
import {
    follow, unfollow, setCurrentPage, requestUsers
} from "../../redux/users_reducer";
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


let mapStateToProps = (state) =>{
    return {
        users: getUsers(state),
        totalUsersCount: getTotalUsersCount(state),
        pageSize: getPageSize(state),
        currentPage: getCurrentPage(state),
        isLoading: getIsLoading(state),
        followingInProgress: getFollowingInProgress(state),
    }
};
class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.requestUsers(this.props.currentPage, this.props.pageSize);
    }
    onPageChange = (page) => {
        this.props.setCurrentPage(page);
        this.props.requestUsers(page, this.props.pageSize);
    };
    render() {
        return <Users
            onPageChange = {this.onPageChange}
            {...this.props}
        />
    }
}
export default compose(
    WithAuthRedirect,
    connect(mapStateToProps, {setCurrentPage, requestUsers, follow, unfollow})
)
(UsersContainer);