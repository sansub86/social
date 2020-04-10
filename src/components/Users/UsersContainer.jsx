import React from 'react';
import Users from "./Users";
import {connect} from "react-redux";
import {
    follow, unfollow, setCurrentPage, getUsers
} from "../../redux/users_reducer";
import {compose} from "redux";
import {WithAuthRedirect} from "../../hoc/withAuthRedirect";


let mapStateToProps = (state) =>{
    return {
        users: state.usersPage.users,
        totalUsersCount: state.usersPage.totalUsersCount,
        pageSize: state.usersPage.pageSize,
        currentPage: state.usersPage.currentPage,
        isLoading: state.usersPage.isLoading,
        followingInProgress: state.usersPage.followingInProgress,
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
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }
    onPageChange = (page) => {
        this.props.setCurrentPage(page);
        this.props.getUsers(page, this.props.pageSize);
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
    connect(mapStateToProps, {setCurrentPage, getUsers, follow, unfollow})
)
(UsersContainer);