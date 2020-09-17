/**
 * Created by Александр on 08.02.2020.
 */
import {updateObjectInArray} from "../utils/object-helpers";
import {UserType} from "../types/types";
import {Dispatch} from "react";
import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {usersAPI} from "../api/users-api";
import {APIResponseType} from "../api/api";

let InitialState = {
    users: [] as Array<UserType>,
    pageSize: 15,
    totalUsersCount: 0,
    currentPage: 1,
    isLoading: false,
    followingInProgress: [] as Array<number>, //array of id user
    filter: {
        term: '',
        friend: null as null | boolean
    }
};

const usersReducer = (state = InitialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "SN/USERS/FOLLOW":
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
            };
        case "SN/USERS/UNFOLLOW":
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
            };
        case "SN/USERS/SET_USERS":
            return {
                ...state,
                users: [...action.users]
            };
        case "SN/USERS/SET_CURRENT_PAGE":
            return {...state, currentPage: action.currentPage};
        case "SN/USERS/SET_USERS_COUNT":
            return {...state, totalUsersCount: action.totalUsersCount};
        case "SN/USERS/TOGGLE_IS_LOADING":
            return {...state, isLoading: action.isLoading};
        case "SN/USERS/SET_FILTER":
            return {...state, filter: action.payload};
        case "SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS":
            return {
                ...state,
                followingInProgress: action.isLoading ? [...state.followingInProgress, action.userId] : state.followingInProgress.filter(id => id !== action.userId)
            };
        default:
            return state;
    }
};

export const actions = {
    followSuccess: (userId: number) => ({type: 'SN/USERS/FOLLOW', userId: userId} as const),
    unfollowSuccess: (userId: number) => ({type: 'SN/USERS/UNFOLLOW', userId: userId} as const),
    setUsers: (users: Array<UserType>) => ({type: 'SN/USERS/SET_USERS', users: users} as const),
    setFilter: (filter: FilterType) =>({type: 'SN/USERS/SET_FILTER', payload: filter} as const),
    setCurrentPage: (currentPage: number) => ({
        type: 'SN/USERS/SET_CURRENT_PAGE',
        currentPage: currentPage
    } as const),
    setTotalUsersCount: (totalUsersCount: number) => ({
        type: 'SN/USERS/SET_USERS_COUNT',
        totalUsersCount: totalUsersCount
    } as const),
    toggleIsLoading: (isLoading: boolean) => ({
        type: 'SN/USERS/TOGGLE_IS_LOADING',
        isLoading
    } as const),
    toggleFollowingProgress: (isLoading: boolean, userId: number) => ({
        type: 'SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS',
        isLoading,
        userId
    } as const)
};

export const requestUsers = (page: number, PageSize: number, filter: FilterType): ThunkType => async (dispatch, getState) => {
    dispatch(actions.toggleIsLoading(true));
    dispatch(actions.setCurrentPage(page));
    dispatch(actions.setFilter(filter));
    let data = await usersAPI.getUsers(page, PageSize, filter.term, filter.friend);
    dispatch(actions.toggleIsLoading(false));
    dispatch(actions.setUsers(data.items));
    dispatch(actions.setTotalUsersCount(data.totalCount));

};
const _followUnfollowFlow = async (dispatch: Dispatch<ActionsTypes>, userId: number, apiMethod: (userId: number) => Promise<APIResponseType>, actionCreator: (userId: number) => ActionsTypes) => {
    dispatch(actions.toggleFollowingProgress(true, userId));
    let response = await apiMethod(userId);
    if (response.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(actions.toggleFollowingProgress(false, userId));
};
export const follow = (userId: number): ThunkType => async (dispatch) => {
    await _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), actions.followSuccess)
};
export const unfollow = (userId: number): ThunkType => async (dispatch) => {
    await _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), actions.unfollowSuccess)
};

type ActionsTypes = InferActionsTypes<typeof actions>
export type InitialStateType = typeof InitialState
export type FilterType= typeof InitialState.filter
type ThunkType = BaseThunkType<ActionsTypes>

export default usersReducer;