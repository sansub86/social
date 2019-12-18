import * as serviceWorker from './serviceWorker';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//import store from './redux/store'
import store from './redux/redux-store'

const renderEntireTree = (props) => {
    ReactDOM.render(<App store={store}></App>, document.getElementById('root'));
};
renderEntireTree(store.getState());
store.subscribe(renderEntireTree);
serviceWorker.unregister();
