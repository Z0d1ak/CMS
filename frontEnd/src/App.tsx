import React from 'react';
import './App.css';
import {Login} from "./loginAndRegister/login/login";
import {Register} from "./loginAndRegister/register/register";
import MainPart from "./base/mainInterface/mainPart/mainPart"
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";


import {MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons";


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

