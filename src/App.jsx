import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar'
import {BrowserRouter, Route, withRouter} from "react-router-dom";
import Music from "./components/Music/Music";
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {compose} from "redux";
import {connect, Provider} from "react-redux";
import {initializeApp} from "./redux/app_reducer";
import Preloader from "./components/common/Preloader/Preloader";
import store from "./redux/redux-store";
import {withSuspense} from "./hoc/withSuspense";

const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));

class App extends React.Component {
    componentDidMount() {
        this.props.initializeApp();
    };

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <div className="app-wrapper">
                <HeaderContainer/>
                <Navbar/>
                <div className="app-wrapper-content">
                    <Route path='/dialogs' render={withSuspense(DialogsContainer)}/>
                    <Route path='/profile/:userId?' render={withSuspense(ProfileContainer)}/>
                    <Route path='/music' component={Music}/>
                    <Route path='/news' component={News}/>
                    <Route path='/settings' component={Settings}/>
                    <Route path='/users' component={() => <UsersContainer pageTitle={"Самураи"}/>}/>
                    <Route path='/login' render={() => <Login/>}/>
                </div>
            </div>
        )
    };
};
const mapStateToProps = (state) => ({
    initialized: state.app.initialized
});
const ContainerApp = compose(
    withRouter,
    connect(mapStateToProps, {initializeApp})
)(App);

const SamuraiApp = () => {
    return <BrowserRouter>
        <Provider store={store}>
            <ContainerApp/>
        </Provider>
    </BrowserRouter>
};
export default SamuraiApp;
