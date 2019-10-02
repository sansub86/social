import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

let posts = [
    {id: 1, message: 'hi, how do you do?'},
    {id: 2, message: 'Hello World'},
    {id: 2, message: 'What is your name?'}
];

let dialogs = [
    {id: 1, name: 'Sasha'},
    {id: 2, name: 'Sergey'},
    {id: 3, name: 'Ivan'}
];
let messages = [
    {id:1, message: 'Hi', likesCount: 4},
    {id:2, message: 'What is your name', likesCount: 7},
    {id:3, message: 'Yo!', likesCount: 6}
];

ReactDOM.render(<App posts = {posts} dialogs = {dialogs} messages = {messages}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
