/**
 * Created by User-35 on 16.12.2019.
 */
import {InferActionsTypes} from "./redux-store";
const ADD_MESSAGE = "SN/DIALOGS/ADD_MESSAGE";

type DialogType = {
    id:number
    name: string
}
type MessageType = {
    id:number
    message: string
    likesCount: number
}

let initialState = {
    dialogs: [
        {id: 1, name: 'Sasha'},
        {id: 2, name: 'Sergey'},
        {id: 3, name: 'Ivan'}
    ] as Array<DialogType>,
    messages: [
        {id: 1, message: 'Hi', likesCount: 4},
        {id: 2, message: 'What is your name', likesCount: 7},
        {id: 3, message: 'Yo!', likesCount: 6}
    ] as Array<MessageType>,
};

export const actions = {
    sendMessage: (newMessageText: string) => ({type: ADD_MESSAGE, newMessageText} as const)
};
const dialogsReducer = (state = initialState, action:ActionsType):InitialStateType => {
    switch (action.type) {
        case ADD_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, {id:4, message: action.newMessageText, likesCount: 0}],
            };
        default:
            return state;
    }
};
export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>
export default dialogsReducer