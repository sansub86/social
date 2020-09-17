/**
 * Created by User-35 on 21.02.2020.
 */
import {getAuthUserData} from "./auth_reducer";
import {InferActionsTypes} from "./redux-store";

const INITIALIZE_SUCCESS = 'INITIALIZE_SUCCESS';

export type InitialStateType = typeof InitialState
type ActionsType = InferActionsTypes<typeof actions>
let InitialState = {
    initialized: false
};
const appReducer = (state = InitialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case INITIALIZE_SUCCESS:
            return {
                ...state,
                initialized: true,
            };

        default:
            return state;
    }
};
export const actions = {
    initializeSuccess: () => ({type: 'INITIALIZE_SUCCESS'})
};
export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserData());
    promise.then(() => {
        dispatch(actions.initializeSuccess());
    });
};

export default appReducer;