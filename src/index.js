import * as serviceWorker from './serviceWorker';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './redux/state'

const renderEntireTree = (props) => {
    ReactDOM.render(<App state={store.getState()} dispatch = {store.dispatch.bind(store)}></App>, document.getElementById('root'));
};
renderEntireTree(store.getState());
store.subscribe(renderEntireTree);
serviceWorker.unregister();
