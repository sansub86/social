/**
 * Created by User-35 on 21.02.2020.
 */
const SET_USER_DATA = 'SET_USER_DATA';

let InitialState = {
    userId: null,
    email: null,
    login: null,

};
const authReducer = (state = InitialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            debugger;
            return{
                ...state,
                ...action.data
            };

        default:
            return state;
    }
};
export const setAuthUserData= (userId, email, login) => ({type: 'SET_USER_DATA', data: {userId, email, login}});
export default authReducer;