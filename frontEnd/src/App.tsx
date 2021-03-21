import React from 'react';
import './App.css';
import {Login} from "./login/login";
import {Settings} from "./settings/settings";
import {Profile} from "./profile/profile";
import MainPart from "./base/mainInterface/mainPart/mainPart"
import {Redactor} from "./redactor/redactor";
import {
    Switch,
    Route,
  } from "react-router-dom";

  import {useHistory} from "react-router-dom";

  
export class App extends React.Component<{},{}> {

  
    render() {
        return(
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/home/alltexts/:id">
            <MainPart></MainPart>
          </Route>
          <Route path="/home">
            <MainPart></MainPart>
          </Route>
          <Route path="/settings">
            <Settings></Settings>
          </Route>
          <Route path="/profile">
            <Profile></Profile>
          </Route>
          <Route path="/redactor">
            <Redactor></Redactor>
          </Route>
        </Switch>
        );
    }
}

export default App;

