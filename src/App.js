import React from 'react';
import './App.css';
import Header from './components/Header/Header'
import Navbar from './components/Navbar/Navbar'
import Profile from './components/Profile/Profile'
import Dialogs from './components/Dialogs/Dialogs'
import {Route} from "react-router-dom";
import Music from "./components/Music/Music";
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import Users from "./components/Users/Users";
import UsersContainer from "./components/Users/UsersContainer";

const App = (props) => {
  return(
      <div className="app-wrapper">
          <Header />
          <Navbar />
          <div className="app-wrapper-content">
              <Route path='/dialogs' render={()=> <DialogsContainer/>} />
              <Route path='/profile' render={()=> <Profile />} />
              <Route path ='/music' component={Music} />
              <Route path='/news' component={News} />
              <Route path='/settings' component={Settings}/>
              <Route path='/users' component={()=><UsersContainer/>}/>
          </div>
          {/*<Profile />*/}
      </div>
  );
};

export default App;
