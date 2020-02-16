/**
 * Created by Александр on 08.02.2020.
 */
const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE =  'SET_CURRENT_PAGE';
const SET_USERS_COUNT = 'SET_USERS_COUNT';
/*let InitialState = {
    users: [
        {id: 1, photoPath: "https://iupac.org/wp-content/uploads/2018/05/default-avatar.png", name: "Igor", status: "I'm a bosss", followed: true, location: {country: "Russia", city: "Moscow"}},
        {id: 2, photoPath: "https://iupac.org/wp-content/uploads/2018/05/default-avatar.png", name: "Sasha", status: "I'm a bosss too", followed: false, location: {country: "Russia", city: "Yaroslavl"}},
        {id: 3, photoPath: "https://iupac.org/wp-content/uploads/2018/05/default-avatar.png", name: "Vasya", status: "I'm a bosss too", followed: false, location: {country: "Italy", city: "Milan"}}
    ]
};*/

let InitialState = {
    users: [],
    pageSize: 15,
    totalUsersCount: 100,
    currentPage: 1
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
            return {...state, totalUsersCount: action.totalUsersCount}
        default:
            return state;
    }
};
export const followAC = (userId) => ({type: 'FOLLOW', userId : userId});
export const unfollowAC = (userId) => ({type: 'UNFOLLOW', userId: userId});
export const setUsersAC = (users) => ({type: 'SET_USERS', users: users});
export const setCurrentPageAC = (currentPage) => ({type: 'SET_CURRENT_PAGE', currentPage: currentPage});
export const setTotalUsersCountAC = (totalUsersCount) => ({type: 'SET_USERS_COUNT', totalUsersCount: totalUsersCount});
export default usersReducer;