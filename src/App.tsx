import React, {ComponentType} from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar'
import {compose} from 'redux';
import {connect, Provider} from "react-redux";
import {initializeApp} from "./redux/app_reducer";
import Preloader from "./components/common/Preloader/Preloader";
import store, {AppStateType} from "./redux/redux-store";
import {withSuspense} from "./hoc/withSuspense";
import UsersPage from "./components/Users/UsersPage";
import HeaderContainer from "./components/Header/HeaderContainer";
import {BrowserRouter, Route, withRouter, Redirect} from "react-router-dom";
import Music from "./components/Music/Music";
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
import {Login} from "./components/Login/Login";


type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    initializeApp: () => void
}
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const SuspendedDialogs = withSuspense(DialogsContainer);
const SuspendedProfile = withSuspense(ProfileContainer);

class App extends React.Component<MapPropsType & DispatchPropsType> {
    catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
        console.log("SomeError");
    };

    componentDidMount() {
        this.props.initializeApp();
        window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors)
    };

    componentWillUnmount() {
        window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors)
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <div className="app-wrapper">
                <HeaderContainer/>
                <Navbar/>
                <div className="app-wrapper-content">
                    <Route exact path='/' render={() => <Redirect to={"/profile"}/>}/>
                    <Route path='/dialogs' render={() => <SuspendedDialogs/>}/>
                    <Route path='/profile/:userId?' render={() => <SuspendedProfile/>}/>
                    <Route path='/music' component={Music}/>
                    <Route path='/news' component={News}/>
                    <Route path='/settings' component={Settings}/>
                    <Route path='/users' component={() => <UsersPage pageTitle={"Самураи"}/>}/>
                    <Route path='/login' render={() => <Login/>}/>
                </div>
            </div>
        )
    };
}

const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized
});
const ContainerApp = compose<ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeApp})
)(App);

const SamuraiApp: React.FC = () => {
    return <BrowserRouter>
        <Provider store={store}>
            <ContainerApp/>
        </Provider>
    </BrowserRouter>
};
export default SamuraiApp;
