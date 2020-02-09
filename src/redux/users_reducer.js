/**
 * Created by Александр on 08.02.2020.
 */
const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
/*let InitialState = {
    users: [
        {id: 1, photoPath: "https://iupac.org/wp-content/uploads/2018/05/default-avatar.png", name: "Igor", status: "I'm a bosss", followed: true, location: {country: "Russia", city: "Moscow"}},
        {id: 2, photoPath: "https://iupac.org/wp-content/uploads/2018/05/default-avatar.png", name: "Sasha", status: "I'm a bosss too", followed: false, location: {country: "Russia", city: "Yaroslavl"}},
        {id: 3, photoPath: "https://iupac.org/wp-content/uploads/2018/05/default-avatar.png", name: "Vasya", status: "I'm a bosss too", followed: false, location: {country: "Italy", city: "Milan"}}
    ]
};*/

let InitialState = {
    users: []
}
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
                users: [...state.users,...action.users]
            };
        default:
            return state;
    }
};
export const followAC = (userId) => ({type: 'FOLLOW', userId : userId});
export const unfollowAC = (userId) => ({type: 'UNFOLLOW', userId: userId});
export const setUsersAC = (users) => ({type: 'SET_USERS', users: users});
export default usersReducer;