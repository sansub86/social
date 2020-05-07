/**
 * Created by Александр on 08.02.2020.
 */
import {usersAPI} from "../api/api";
import {updateObjectInArray} from "../utils/object-helpers";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
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
                users: updateObjectInArray(state.users, action.userId,"id",{followed:true})
            };
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId,"id",{followed:false})
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
            return {
                ...state,
                followingInProgress: action.isLoading ? [...state.followingInProgress, action.userId] : state.followingInProgress.filter(id => id !== action.userId)
            };
        default:
            return state;
    }
};
export const followSuccess = (userId) => ({type: 'FOLLOW', userId: userId});
export const unfollowSuccess = (userId) => ({type: 'UNFOLLOW', userId: userId});
export const setUsers = (users) => ({type: 'SET_USERS', users: users});
export const setCurrentPage = (currentPage) => ({type: 'SET_CURRENT_PAGE', currentPage: currentPage});
export const setTotalUsersCount = (totalUsersCount) => ({type: 'SET_USERS_COUNT', totalUsersCount: totalUsersCount});
export const toggleIsLoading = (isLoading) => ({type: 'TOGGLE_IS_LOADING', isLoading});
export const toggleFollowingProgress = (isLoading, userId) => ({
    type: 'TOGGLE_IS_FOLLOWING_PROGRESS',
    isLoading,
    userId
});

export const requestUsers = (page, PageSize) => async (dispatch) => {
    dispatch(toggleIsLoading(true));
    dispatch(setCurrentPage(page));
    let data = await usersAPI.getUsers(page, PageSize);
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));
    dispatch(toggleIsLoading(false));
};
const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
    dispatch(toggleFollowingProgress(true, userId));
    let response = await apiMethod(userId);
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(toggleFollowingProgress(false, userId));
};
export const follow = (userId) => async (dispatch) => {
    followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess)
};
export const unfollow = (userId) => async (dispatch) => {
    followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess)
};
export default usersReducer;