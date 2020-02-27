/**
 * Created by User-35 on 21.02.2020.
 */
const SET_USER_DATA = 'SET_USER_DATA';

let InitialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false

};
const authReducer = (state = InitialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return{
                ...state,
                ...action.data,
                isAuth: true
            };

        default:
            return state;
    }
};
export const setAuthUserData= (userId, email, login) => ({type: 'SET_USER_DATA', data: {userId, email, login}});
export default authReducer;