/**
 * Created by Александр on 08.02.2020.
 */
import {usersAPI} from "../api/api";
const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE =  'SET_CURRENT_PAGE';
const SET_USERS_COUNT = 'SET_USERS_COUNT';
const TOGGLE_IS_LOADING = 'TOGGLE_IS_LOADING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

let InitialState = {
    users: [],
    pageSize: 15,
    totalUsersCount: 0,
    currentPage: 1,
    isLoading: false,
    followingInProgress: []
};
const usersReducer = (state = InitialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if(u.id === action.userId){
                        return {...u, followed: true}
                    }
                    return u;
                })
            };
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {

                    if(u.id === action.userId){
                        return {...u, followed: false}
                    }
                    return u;
                })
            };
        case SET_USERS:
            return {
                ...state,
                users: [...action.users]
            };
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage};
        case SET_USERS_COUNT:
            return {...state, totalUsersCount: action.totalUsersCount};
        case  TOGGLE_IS_LOADING:
            return {...state, isLoading: action.isLoading};
        case  TOGGLE_IS_FOLLOWING_PROGRESS:
            return {...state,
                followingInProgress: action.isLoading?[...state.followingInProgress, action.userId]:state.followingInProgress.filter(id =>id!==action.userId )
            };
        default:
            return state;
    }
};
export const followSuccess = (userId) => ({type: 'FOLLOW', userId : userId});
export const unfollowSuccess = (userId) => ({type: 'UNFOLLOW', userId: userId});
export const setUsers = (users) => ({type: 'SET_USERS', users: users});
export const setCurrentPage = (currentPage) => ({type: 'SET_CURRENT_PAGE', currentPage: currentPage});
export const setTotalUsersCount = (totalUsersCount) => ({type: 'SET_USERS_COUNT', totalUsersCount: totalUsersCount});
export const toggleIsLoading = (isLoading) => ({type: 'TOGGLE_IS_LOADING', isLoading});
export const toggleFollowingProgress = (isLoading, userId) => ({type: 'TOGGLE_IS_FOLLOWING_PROGRESS',isLoading, userId});

export const getUsers = (currentPage, PageSize) => (dispatch) => {
    dispatch(toggleIsLoading(true));
    usersAPI.getUsers(currentPage, PageSize).then(data => {
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
        dispatch(toggleIsLoading(false));
    })
};
export const follow = (userId) => (dispatch) => {
    dispatch(toggleFollowingProgress(true, userId));
    usersAPI.follow(userId).then(response => {
        if(response.data.resultCode === 0){
            dispatch(followSuccess(userId));
        }
        dispatch(toggleFollowingProgress(false, userId));
    });

};
export const unfollow = (userId) => (dispatch) => {
    dispatch(toggleFollowingProgress(true, userId));
    usersAPI.unfollow(userId).then(response => {
        if(response.data.resultCode === 0){
            dispatch(unfollowSuccess(userId));
        }
        dispatch(toggleFollowingProgress(false, userId));
    });
};
export default usersReducer;