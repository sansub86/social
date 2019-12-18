/**
 * Created by User-35 on 16.12.2019.
 */
/**
 * Created by User-35 on 16.12.2019.
 */
const ADD_POST = "ADD_POST";
const UPADATE_NEW_POST_TEXT = "UPADATE_NEW_POST_TEXT";
export const addNewPostActionCreator = () => ({type: ADD_POST});
export const updateNewPostActionCreator = (text) => ({type: UPADATE_NEW_POST_TEXT, newText:text});

let initialState = {
    posts: [
        {id: 1, message: 'hi, how do you do?'},
        {id: 2, message: 'Hello World'},
        {id: 2, message: 'What is your name?'}
    ],
    newPostText: "Post Text",
};

const profileReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_POST:
            state.posts.push({
                id: 4,
                message: state.newPostText,
            });
            state.newPostText = '';
            return state;
        case UPADATE_NEW_POST_TEXT:
            state.newPostText = action.newText;
            return state;
        default:
            return state;
    }
};
export default profileReducer;