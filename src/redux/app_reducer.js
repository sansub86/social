/**
 * Created by User-35 on 21.02.2020.
 */
import {getAuthUserData} from "./auth_reducer";

const INITIALIZE_SUCCESS = 'INITIALIZE_SUCCESS';

let InitialState = {
    initialized: false
};
const appReducer = (state = InitialState, action) => {
    switch (action.type) {
        case INITIALIZE_SUCCESS:
            return{
                ...state,
                initialized: true,
            };

        default:
            return state;
    }
};
export const initializeSuccess= () => ({type: 'INITIALIZE_SUCCESS'});
export const initializeApp = () => (dispatch) => {
    let promise = dispatch(getAuthUserData());
    promise.then(()=>{
        dispatch(initializeSuccess());
    });
};

export default appReducer;