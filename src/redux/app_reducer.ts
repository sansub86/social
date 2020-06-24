/**
 * Created by User-35 on 21.02.2020.
 */
import {getAuthUserData} from "./auth_reducer";

const INITIALIZE_SUCCESS = 'INITIALIZE_SUCCESS';

export type InitialStateType = {
    initialized: boolean
}

let InitialState: InitialStateType = {
    initialized: false
};
const appReducer = (state = InitialState, action: any):InitialStateType => {
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
type initializeSuccessActionType = {
    type: typeof INITIALIZE_SUCCESS
}
export const initializeSuccess= ():initializeSuccessActionType => ({type: 'INITIALIZE_SUCCESS'});
export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserData());
    promise.then(()=>{
        dispatch(initializeSuccess());
    });
};

export default appReducer;