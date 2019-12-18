/**
 * Created by User-35 on 24.10.2019.
 */
import profileReducer from './profile_reducer';
import dialogsReducer from './dialogs_reducer';

let store = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: 'hi, how do you do?'},
                {id: 2, message: 'Hello World'},
                {id: 2, message: 'What is your name?'}
            ],
            newPostText: "Post Text",
        },
        dialogsPage: {
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
        },
        settings: {

        }
    },
    _callSubscriber(){

    },

    getState(){
        return this._state;
    },
    subscribe(observer){
        this._callSubscriber = observer;
    },
    dispatch(action){
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._callSubscriber(this._state);
    }

};
export default store;
window.store = store;