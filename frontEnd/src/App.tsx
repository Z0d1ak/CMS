import React from 'react';
import './App.css';
import './Cards/Cards.tsx';
import {Login} from "./Login/Login";
import {Register} from "./Register/Register";
import MainPart from "./Base/mainInterface/mainPart/mainPart"
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";


import {MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons";
import AllTexts from "./AllTexts/AllTexts";


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

