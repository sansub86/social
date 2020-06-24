/**
 * Created by User-35 on 16.12.2019.
 */
const ADD_MESSAGE = "ADD_MESSAGE";
type SendMessageActionCreatorType = {
    type: typeof ADD_MESSAGE
    newMessageText: string
}
export const sendMessageActionCreator = (newMessageText: string):SendMessageActionCreatorType => ({type: ADD_MESSAGE, newMessageText});
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
    ] as Array<MessageType>
};
export type initialStateType = typeof initialState;

const dialogsReducer = (state = initialState, action:any):initialStateType => {
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
export default dialogsReducer