import React from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button, Card, Checkbox, Col, Row, notification } from 'antd';
import axios from 'axios'
import { useState } from 'react';
import { useHistory } from "react-router-dom";
export class MediaSources extends React.Component{

    constructor(props){
        super(props)
    }


    render(){
        //return(<p>gfdgdfsgdfskgpkdfshkdpokhdgkhkspodgkpohkgpohk</p>)
        return (<TelegrammMedia/>)
    }
}

class TelegrammMedia extends React.Component{
    
    constructor(props){
        super(props)
        this.tgBotNAmeChange = this.tgBotNAmeChange.bind(this)
        this.thChanelNameChange = this.thChanelNameChange.bind(this)
        this.save = this.save.bind(this)
    }
    state = {
        tgBotNAme: "",
        thChanelName: "",
        modified: false,
        loaded: false
    }

    tgBotNAmeChange(event){
        console.log(event)
        this.setState({
            tgBotNAme: event.target.value,
            modified: true
        })
    }

    thChanelNameChange(event){
        this.setState({
            thChanelName: event.target.value,
            modified: true
        })
    }

    save(){
        let val = {
            botname: this.state.tgBotNAme,
            chanelname: this.state.thChanelName
        };

        //axios.post("https://localhost:44329/api/publish/tg",
        axios.post("https://hse-cms.herokuapp.com/api/publish/tg",
        val,
        {
        headers: {
            "Authorization": "Bearer " + sessionStorage.getItem("AuthUserSecurityToken")
        }})
        .then(res => {
            this.setState({
                modified: false
            })
        })
        .catch(err =>{
            console.log(err);
        })
    }

    componentDidMount(){
        //axios.get("https://localhost:44329/api/publish/tg",
        axios.get("https://hse-cms.herokuapp.com/api/publish/tg",
        {
        headers: {
            "Authorization": "Bearer " + sessionStorage.getItem("AuthUserSecurityToken")
        }})
        .then(res => {
            console.log(res)
            this.setState({
                tgBotNAme: res.data.botName,
                thChanelName: res.data.chanelName,
                modified: false,
                loaded: true
            })
        })
        .catch(err =>{
            console.log(err);
        })
    }

    render(){
        return(
            <div>
                <Card>
                    <p>Токен бота</p>
                    <Input value={this.state.tgBotNAme} onChange={this.tgBotNAmeChange}></Input>
                    <p>Токен Чата</p>
                    <Input value={this.state.thChanelName} onChange={this.thChanelNameChange}></Input>
                    {this.state.modified && <Button onClick={this.save}>Сохранить</Button>}
                </Card>
            </div>
        )
    }
}