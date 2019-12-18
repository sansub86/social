/**
 * Created by User-35 on 16.12.2019.
 */
const ADD_MESSAGE = "ADD_MESSAGE";
const UPDATE_NEW_MESSAGE_TEXT = "UPDATE_NEW_MESSAGE_TEXT";
export const sendMessageActionCreator = () => ({type: ADD_MESSAGE});
export const updateNewMessageTextActionCreator = (text) => ({type: UPDATE_NEW_MESSAGE_TEXT,newMessageTextBody:text});

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
    ],
    newMessageText: "New Message"
};

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            state.messages.push({
                id: 4,
                message: state.newMessageText
            });
            state.newMessageText = '';
            return state;
        case UPDATE_NEW_MESSAGE_TEXT:
            state.newMessageText = action.newMessageTextBody;
            return state;
        default:
            return state;
    }
};
export default dialogsReducer;
