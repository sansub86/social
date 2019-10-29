import * as serviceWorker from './serviceWorker';
import state from './redux/state';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {addPost, updateNewPostText, subscribe} from './redux/state'

const renderEntireTree = (props) => {
    ReactDOM.render(<App posts = {props.posts} dialogs = {props.dialogs} messages = {props.messages} addPost = {addPost} newPostText = {props.newPostText} updateNewPostText = {updateNewPostText}></App>, document.getElementById('root'));
};
renderEntireTree(state);
subscribe(renderEntireTree);
serviceWorker.unregister();
