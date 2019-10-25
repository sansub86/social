/**
 * Created by User-35 on 24.10.2019.
 */
import renderEntireTree from '../render';
let state = {
    posts : [
        {id: 1, message: 'hi, how do you do?'},
        {id: 2, message: 'Hello World'},
        {id: 2, message: 'What is your name?'}
    ],
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
export let addPost = (textPost) => {
    state.posts.push({
        id: 4,
        message: textPost,
    });
    renderEntireTree(state);
};