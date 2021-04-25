import React from 'react';
import './App.css';
import { Login } from "./login/login";
import { Settings } from "./settings/settings";
import { Profile } from "./profile/profile";
import MainPart from "./base/mainInterface/mainPart/mainPart"
import { ArticleV, Redactor } from "./redactor/redactor";
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { ArticlePreview, ArticlePreview2, EditorJSRedactor } from './redactor/editorJsRedactor';
import {MediaSources} from "./mediasources/mediaSources.js"

export class App extends React.Component<{}, {}> {


  render() {
    return (
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
        <Route path="/redactor/:id" component={EditorJSRedactor} />
        <Route path="/article/:id" component={ArticlePreview} />

        <Route path="/media">
          <MediaSources></MediaSources>
        </Route>
        <Route path="/:name" component={ArticlePreview2} />
        <Route path="/">
          <Redirect from='/' to='/login' />
        </Route>
      </Switch>
    );
  }
}

export default App;

