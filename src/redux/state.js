/**
 * Created by User-35 on 24.10.2019.
 */
const ADD_POST = "ADD_POST";
const UPADATE_NEW_POST_TEXT = "UPADATE_NEW_POST_TEXT";
let store = {
    _state: {
        posts: [
            {id: 1, message: 'hi, how do you do?'},
            {id: 2, message: 'Hello World'},
            {id: 2, message: 'What is your name?'}
        ],
        newPostText: "Post Text",
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
    },
    _callSubscriber(){

    },

    getState(){
        return this._state;
    },
    subscribe(observer){
        this._callSubscriber = observer;
    },
    updateNewPostText(text){
        this._state.newPostText = text;
        this._callSubscriber(this._state);
    },
    dispatch(action){
      if(action.type === ADD_POST){
          this._state.posts.push({
              id: 4,
              message: this._state.newPostText,
          });
          this._state.newPostText = '';
          this._callSubscriber(this._state);
      }else if(action.type === UPADATE_NEW_POST_TEXT){
          this._state.newPostText = action.newText;
          this._callSubscriber(this._state);
      }
    }

};
export const addNewPostActionCreator = () => ({type: ADD_POST});
export const updateNewPostActionCreator = (text) => ({type: UPADATE_NEW_POST_TEXT, newText:text});
export default store;
window.store = store;