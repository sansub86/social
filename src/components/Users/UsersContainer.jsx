import React from 'react';
import Users from "./Users";
import {connect} from "react-redux";
import {
    followSuccess, setUsers, unfollowSuccess, setCurrentPage, setTotalUsersCount,
    toggleIsLoading, toggleFollowingProgress
} from "../../redux/users_reducer";
import {usersAPI} from "../../api/api";


let mapStateToProps = (state) =>{
    return {
        users: state.usersPage.users,
        totalUsersCount: state.usersPage.totalUsersCount,
        pageSize: state.usersPage.pageSize,
        currentPage: state.usersPage.currentPage,
        isLoading: state.usersPage.isLoading,
        followingInProgress: state.usersPage.followingInProgress
    }
};

/*let mapDispatchToProps = (dispatch) => {
    return {
        follow : (userId) => { dispatch(followAC(userId)) },
        unfollow: (userId) => {dispatch(unfollowAC(userId))},
        setUsers: (users) => {dispatch(setUsersAC(users))},
        setCurrentPage: (pageNumber) => {dispatch(setCurrentPageAC(pageNumber))},
        setTotalUsersCount: (usersNumber) => {dispatch(setTotalUsersCountAC(usersNumber))},
        toggleIsLoading: (isLoading) => {dispatch(toggleIsLoadingAC(isLoading))}
    }
};*/
class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.toggleIsLoading(true);
        usersAPI.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
            this.props.setUsers(data.items);
            this.props.setTotalUsersCount(data.totalCount);
            this.props.toggleIsLoading(false);
        });
    }
    onPageChange = (page) => {
        this.props.toggleIsLoading(true);
        this.props.setCurrentPage(page);
        usersAPI.getUsers(page,this.props.pageSize).then(data => {
            this.props.setUsers(data.items);
            this.props.toggleIsLoading(false);
        });
    };
    render() {
        return <Users
            onPageChange = {this.onPageChange}
            {...this.props}
        />
    }
}
export default connect(mapStateToProps, {followSuccess, setUsers, unfollowSuccess, setCurrentPage, setTotalUsersCount, toggleIsLoading, toggleFollowingProgress})(UsersContainer);