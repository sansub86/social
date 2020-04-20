/**
 * Created by User-35 on 16.12.2019.
 */
const ADD_MESSAGE = "ADD_MESSAGE";
export const sendMessageActionCreator = (newMessageText) => ({type: ADD_MESSAGE, newMessageText});

let initialState = {
    dialogs: [
        {id: 1, name: 'Sasha'},
        {id: 2, name: 'Sergey'},
        {id: 3, name: 'Ivan'}
    ],
    messages: [
        {id: 1, message: 'Hi', likesCount: 4},
        {id: 2, message: 'What is your name', likesCount: 7},
        {id: 3, message: 'Yo!', likesCount: 6}
    ]
};

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, {id:4, message: action.newMessageText}],
            };
        default:
            return state;
    }
};
export default dialogsReducer;
