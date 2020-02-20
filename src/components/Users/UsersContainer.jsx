import React from 'react';
import Users from "./Users";
import {connect} from "react-redux";
import {
    follow, setUsers, unfollow, setCurrentPage, setTotalUsersCount,
    toggleIsLoading
} from "../../redux/users_reducer";
import * as axios from 'axios'

let mapStateToProps = (state) =>{
    return {
        users: state.usersPage.users,
        totalUsersCount: state.usersPage.totalUsersCount,
        pageSize: state.usersPage.pageSize,
        currentPage: state.usersPage.currentPage,
        isLoading: state.usersPage.isLoading
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
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`).then(response => {
            this.props.setUsers(response.data.items);
            this.props.setTotalUsersCount(response.data.totalCount);
            this.props.toggleIsLoading(false);
        });
    }
    onPageChange = (page) => {
        this.props.toggleIsLoading(true);
        this.props.setCurrentPage(page);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${page}&count=${this.props.pageSize}`).then(response => {
            this.props.setUsers(response.data.items);
            this.props.toggleIsLoading(false);
        });
    };
    render() {
        return <Users
            currentPage = {this.props.currentPage}
            pageSize = {this.props.pageSize}
            onPageChange = {this.onPageChange}
            totalUsersCount = {this.props.totalUsersCount}
            users = {this.props.users}
            follow = {this.props.follow}
            unfollow = {this.props.unfollow}
            isLoading = {this.props.isLoading}
            toggleIsLoading = {this.props.toggleIsLoading}
        />
    }
}
export default connect(mapStateToProps, {follow, setUsers, unfollow, setCurrentPage, setTotalUsersCount, toggleIsLoading})(UsersContainer);