import React from 'react';
import './App.css';
import './Cards/Cards.tsx';
import {Base} from "./Base/Base";
import {Login} from "./Login/Login";


import {MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons";


export class App extends React.Component<{},{}> {

    render() {
        return(<Base></Base>);
    }
}

export default App;

