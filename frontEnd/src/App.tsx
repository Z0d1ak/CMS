import React from 'react';
import './App.css';
import {Login} from "./loginAndRegister/login/login";
import {Register} from "./loginAndRegister/register/register";
import MainPart from "./base/mainInterface/mainPart/mainPart"
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
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/home">
            <MainPart></MainPart>
          </Route>
        </Switch>
        );
    }
}

export default App;

