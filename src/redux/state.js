/**
 * Created by User-35 on 24.10.2019.
 */
let renderEntireTree = () => {

};
let state = {
    posts : [
        {id: 1, message: 'hi, how do you do?'},
        {id: 2, message: 'Hello World'},
        {id: 2, message: 'What is your name?'}
    ],
    newPostText: "Post Text",
    dialogs : [
        {id: 1, name: 'Sasha'},
        {id: 2, name: 'Sergey'},
        {id: 3, name: 'Ivan'}
    ],
    messages : [
        {id:1, message: 'Hi', likesCount: 4},
        {id:2, message: 'What is your name', likesCount: 7},
        {id:3, message: 'Yo!', likesCount: 6}
        ]
};
export default state;
export const addPost = (textPost) => {
    state.posts.push({
        id: 4,
        message: textPost,
    });
    state.newPostText = '';
    renderEntireTree(state);
};
export const updateNewPostText = (text) => {
    state.newPostText = text;
    renderEntireTree(state);
};
export const subscribe = (observer) => {
    renderEntireTree = observer;
};