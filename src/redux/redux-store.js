/**
 * Created by User-35 on 17.12.2019.
 */

import {combineReducers, createStore} from "redux";
import profileReducer from "./profile_reducer";
import dialogsReducer from "./dialogs_reducer";
import settingsReducer from "./settings_reducer"
import usersReducer from "./users_reducer"

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    settings: settingsReducer,
    usersPage: usersReducer
});

let store = createStore(reducers);

window.store = store;

export default store;