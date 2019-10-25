import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {addPost} from './redux/state'
const renderEntireTree = (props) => {
    ReactDOM.render(<App posts = {props.posts} dialogs = {props.dialogs} messages = {props.messages} addPost = {addPost}></App>, document.getElementById('root'));
};
export default renderEntireTree;

