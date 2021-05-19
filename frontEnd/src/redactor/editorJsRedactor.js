import ReactDOM from "react-dom";
import React, { Component } from "react";
import { Row, Col, Card, Input, Tag, Button, AutoComplete, notification, DatePicker } from 'antd';
import EditorJs from "react-editor-js";
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';
import CheckList from '@editorjs/checklist';
import { getUser} from "../const/shared"
import 'antd/dist/antd.css';
import {EditorCore} from "./articleEditor"
import { EDITOR_JS_TOOLS } from './tools'
import { throws } from "assert";
import moment from 'moment';



const { Option } = AutoComplete;

export class EditorJSRedactor extends React.Component{

    constructor(props){
        super(props)
        this.handleCommentChange = this.handleCommentChange.bind(this);
        this.sentToAuthor = this.sentToAuthor.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.takeToWork = this.takeToWork.bind(this);
        this.complete = this.complete.bind(this);
        this.save = this.save.bind(this);
        this.savePub = this.savePub.bind(this);
        this.dateChange = this.dateChange.bind(this)
        this.editorInstance = null;
    }

    state = {
        id: this.props.match.params.id,
        dataType: "Redactor",
        //requestUrl: "https://localhost:44329",
        requestUrl: "https://hse-cms.herokuapp.com",
        requestPath: "/api/Article/",
        loaded: false,
        task: null,
        comment: null,
        ispublished: false,
        disppubdata: false,
         published: null,
                    pubdate: null,
                    link: null,
        haspubdata: false,
        searchResult: [],
        usersSearch: null,
        article: {
            id: "",
            tasks: [],
            title: "",
            content: ''
        },
        data: {},
        grid: {}
    }

    

    editorInstance = null

    handleCommentChange(event) {
        this.setState({comment: event.target.value});
    }

    takeToWork(){
        axios.post("https://hse-cms.herokuapp.com/api/Task/take?taskId=" + this.actualTask.id, null,
        {
        headers: {
            "Authorization": "Bearer " + sessionStorage.getItem("AuthUserSecurityToken")
        }}).then(res => {
            notification.success({
                message: "Задание взято в работу.",
                description: ""
            })
            this.refresh()
        })
        .catch(err =>{
            console.log(err)
            notification.error({
                message: "ошибка при взятии задания в работу.",
                description: ""
            })
        })
    }

    
    complete(){
        let val = {
            id: this.actualTask.id,
            comment: this.state.comment
        }
        axios.post("https://hse-cms.herokuapp.com/api/Task/finish", val,
        {
                headers: {
                    "Authorization": "Bearer " + sessionStorage.getItem("AuthUserSecurityToken")
                }
        }).then(res => {
            notification.success({
                message: "Задание завршено.",
                description: ""
            })
            this.refresh()
        })
        .catch(err =>{
            notification.error({
                message: "Ошибка при завершении задания.",
                description: ""
            })
            console.log(err)
        })
    }

    sentToAuthor(){
        let val = {
            id: uuidv4(),
            articleId: this.state.article.id,
            taskType: "Write",
            description: this.state.comment,
            assignee: null
            }
         axios.post("https://hse-cms.herokuapp.com/api/Task/create", val,
            {
                headers: {
                    "Authorization": "Bearer " + sessionStorage.getItem("AuthUserSecurityToken")
                }
            })
            .then(res => {
                notification.success({
                            message: "Статья успешно отправлена на написание.",
                            description: ""
                        })
                this.refresh()
            })
            .catch(err => {
                console.log(err);
                notification.error({
                            message: "Задание не создано. Повторите попытку позднее.",
                            description: ""
                        })
            })
    }

    async getUsers(role){
        var result = await axios.get(
            "https://hse-cms.herokuapp.com/api/Task/create",
            {
                headers: {
                    "Authorization": "Bearer " + sessionStorage.getItem("AuthUserSecurityToken")
                }
            });
        return result.data.items;
    }

    handleSearch(value){
        if(value == null || value === undefined){
            this.setState({searchResult: [...this.state.usersSearch]});
            return
        }
        let res = this.state.usersSearch
            .filter(x => x.firstName.toUpperCase().includes(value.toUpperCase()))
            .filter(x => x.lastName.toUpperCase().includes(value.toUpperCase()))

        this.setState({searchResult: res});
        console.log(res)
        
    };
/*
<p>Назначить на автора: </p>
                        <AutoComplete
                            onSearch={this.handleSearch}
                            placeholder={'Сотрудник'}>
                            {this.state.searchResult.map((user) => (
                                <Option key={user.firstName} value={user.firstName}>
                                {user.firstName}
                                </Option>
                            ))}    

                        </AutoComplete>
*/
    getTaskName(taskType){
        if(taskType === "Write"){
            return "Написание статьи"
        }
        if(taskType === "Redact"){
            return "Редакция статьи"
        }
        if(taskType === "ValidateRedact"){
            return "Подтвержденеи редакции"
        }
        if(taskType === "Correct"){
            return "Коррекция"
        }
        if(taskType === "ValidateCorrect"){
            return "Подтверждение коррекции"
        }
        if(taskType === "Approve"){
            return "Принятие инициативной статьи"
        }
    }

    processTask(art){
        if(art == null){
            return <div></div>
        }
        let tasks = art.tasks;

        if(tasks == null || tasks.length === 0){
            console.log(JSON.stringify(getUser()))
            let roles = getUser().roles;
            if(roles.includes("ChiefRedactor")){
                return (
                    <Card>
                        <p>Отправить на написание</p>
                        
                        <input  value={this.state.comment} onChange={this.handleCommentChange} title={'Комментарии к заданию'} rows={3}></input>
                        <br></br>
                        <Button style={{marginTop: 5}} type="primary" onClick={this.sentToAuthor} >Отправить</Button>
                    </Card>
                )
            }
            else if (roles.includes("Author")){
                return (
                    <Card>
                        <p>Создать инициативную статью</p>
                        
                        <input  value={this.state.comment} onChange={this.handleCommentChange} title={'Комментарии к заданию'} rows={3}></input>
                        <br></br>
                        <Button style={{marginTop: 5}} type="primary" onClick={this.sentToAuthor} >Отправить</Button>
                    </Card>
                )
            }
        }
        else {
            let roles = getUser().roles;
            console.log(roles)
            let nl = <div></div>
            this.actualTask = tasks.find(x => x.сompletionDate == null);

            if(this.actualTask == null){
                return nl
            }
            let taskType = this.actualTask.type
            if(taskType === "Write" && !roles.some(x => x === "Author")){
                return nl
            }
            if(taskType === "Redact" && !roles.some(x => x === "Redactor" || x === "ChiefRedactor")){
                return  nl
            }
            if(taskType === "ValidateRedact" && !roles.some(x => x === "Author")){
                return  nl
            }
            if(taskType === "Correct" && !roles.some(x => x === "Corrector")){
                return  nl
            }
            if(taskType === "ValidateCorrect" && !roles.some(x => x === "Author")){
                return  nl
            }
            if(taskType === "Approve" && !roles.some(x => x === "ChiefRedactor")){
                return  nl
            }


            if(this.actualTask !=null && this.actualTask.assignmentDate == null){
                let taskCaption = this.getTaskName(this.actualTask.type)
                return (
                    <Card>
                        <p>Задание: <b>{taskCaption}</b></p>
                        <br></br>
                        <Button style={{marginTop: 5}} type="primary" onClick={this.takeToWork} >Взять в работу</Button>
                    </Card>
                )
            }
            else if(this.actualTask !=null && this.actualTask.assignmentDate != null){
                let taskCaption = this.getTaskName(this.actualTask.type)
                return (
                    <Card>
                        <p>Задание: <b>{taskCaption}</b></p>
                        <input  value={this.state.comment} onChange={this.handleCommentChange} title={'Комментарии к заданию'} rows={3}></input>
                        <br></br>
                        <Button style={{marginTop: 5}} type="primary" onClick={this.complete} >Завершить</Button>
                    </Card>
                )
            }
            else{
                return (
                    <div>
                        
                    </div>
                )
            }

        }
    }

    refresh(){
        let request = this.props.match.params.id;
        this.setState({comment: null});
        axios.get(
            this.state.requestUrl + this.state.requestPath + request,
            {
                headers: {
                    "Authorization": "Bearer " + sessionStorage.getItem("AuthUserSecurityToken")
                }
            })
            .then(res => {
                console.log(res);
                let tasks = res.data.tasks;
                let role = null
                if(tasks == null || tasks.length === 0){
                    let roles = getUser().roles;
                    if(roles.includes("ChiefRedactor")){
                        role = "ChiefRedactor";
                    }
                    else if (roles.includes("Author")){
                        role = "Author";
                    }
                }
                if(tasks.length > 0 && tasks.every(el => el.сompletionDate != null)){
                    this.setState({disppubdata: true})
                }
                else{
                    this.setState({disppubdata: false})

                }
                if(role == null){
                    this.setState({ article: res.data });
                    this.setState({ grid: JSON.parse(res.data.content) })
                    this.setState({ loaded: true })
                }
                else{
                    axios.get(
                        'https://hse-cms.herokuapp.com/api/User?Role=' + role,
                        {
                            headers: {
                                "Authorization": "Bearer " + sessionStorage.getItem("AuthUserSecurityToken")
                            }
                        })
                        .then(usersRes =>{
                            this.setState({usersSearch: usersRes.data.items})
                            this.setState({ article: res.data });
                            this.setState({ grid: JSON.parse(res.data.content) })
                            this.setState({ loaded: true })
                        })
                        .catch(err2 =>
                            console.log(err2));
                    

                }
            })
            .catch(err => {
                console.log(err);

                switch (err.response.status) {
                    case 401: {
                        console.log("401");
                        break;
                    }
                    default: {
                        console.log("Undefined error");
                        break;
                    }
                }
            })
        axios.get(
            this.state.requestUrl + "/api/publish/pubdata/" +this.props.match.params.id,
            {
                headers: {
                    "Authorization": "Bearer " + sessionStorage.getItem("AuthUserSecurityToken")
                }
            })
            .then(res =>{
                console.log(res)
                this.setState({
                    published: res.data.published,
                    pubdate: res.data.date!=null ? moment(res.data.date) : null,
                    link: res.data.link,
                    haspubdata: true,
                    ispublished: res.data.published
                })
            })
            .catch(
                err => {
                    console.log(err)
                    this.setState({haspubdata: false})
                }
            )
    }

    componentDidMount(){
        this.refresh()
        }

    async save(){
        var data = await this.editorInstance.save()
        let val = {
            id: this.state.article.id,
            title: this.state.article.title,
            content: JSON.stringify(data)
        }
        var resp = await axios.put(this.state.requestUrl + this.state.requestPath, val,
            {
                headers: {
                    "Authorization": "Bearer " + sessionStorage.getItem("AuthUserSecurityToken")
                }
            })

        console.log(resp)
    }

    dateChange(date, datestr){
        console.log(date);
        this.setState({
            pubdate: date
        });
    }



    async savePub(){
         let val = {
            articleId: this.state.article.id,
            date: this.state.pubdate == null ? null : this.state.pubdate.format()
        }
        console.log(val)
        axios.post(this.state.requestUrl + "/api/publish/pubdata", val,
            {
                headers: {
                    "Authorization": "Bearer " + sessionStorage.getItem("AuthUserSecurityToken")
                }
            })
            .then(res => {
                console.log(res)
                this.setState({
                    published: res.data.published,
                    pubdate: res.data.date!=null ? moment(res.data.date) : null,
                    link: res.data.link,
                    haspubdata: true,
                    ispublished: res.data.published
                })
            })
            .catch(err => console.log(err))
    }

    render(){
        if(!this.state.loaded){
            return (<div></div>)
        }
        return (
            <div style={{margin: 10}}>
            {this.state.ispublished && <Tag color="#87d068">Опубликована</Tag>}

            <h1 style={{}}>{this.state.article.title}</h1>
           <Row>
               <Col span={24}>
                    {this.processTask(this.state.article) }
               </Col>
            </Row>
            
            <Row>
                {( !this.state.ispublished && this.state.haspubdata && this.state.disppubdata)  &&
                    <div>
                        <p style={{float: "left", marginRight: 7}}>Дата публикации</p>
                        <DatePicker style={{float: "left", marginRight: 7}} showTime onChange={this.dateChange} value={this.state.pubdate}/>
                        <Button type="primary" onClick={this.savePub}>Опубликовать</Button>
                    </div>
                }
            </Row>
            <Row>
                <Button style={{marginTop: 10}} type="primary" onClick={this.save}>Сохранить</Button>

            </Row>
            <Row>
               <Col span={24}>
                    <EditorJs instanceRef={i => this.editorInstance = i} data={this.state.grid} tools={EDITOR_JS_TOOLS}></EditorJs>
               </Col>
            </Row>
           </div>
        
        );
        // <EditorJs data={this.state.grid} instanceRef={instance => this.editorInstance = instance} tools={{ checkList: CheckList }} />
    }
}

export class ArticlePreview extends React.Component{

     state = {
        id: this.props.match.params.id,
        dataType: "Redactor",
        requestUrl: "https://hse-cms.herokuapp.com",
        requestPath: "/api/Article/",
        loaded: false,
        task: null,
        comment: null,
        searchResult: [],
        usersSearch: null,
        article: {
            id: "",
            tasks: [],
            title: "",
            content: ''
        },
        data: {},
        grid: {}
    }

    componentDidMount(){
        let request = this.props.match.params.id;
        this.setState({comment: null});
        axios.get(
            this.state.requestUrl + this.state.requestPath + request,
            {
                headers: {
                    "Authorization": "Bearer " + sessionStorage.getItem("AuthUserSecurityToken")
                }
            })
            .then(res => {
                console.log(res);
                
                    this.setState({ article: res.data });
                    this.setState({ grid: JSON.parse(res.data.content) })
                    this.setState({ loaded: true })
                }
            )
            .catch(err => {
                console.log(err);

                switch (err.response.status) {
                    case 401: {
                        console.log("401");
                        break;
                    }
                    default: {
                        console.log("Undefined error");
                        break;
                    }
                }
            })
    }

    render(){
        if(!this.state.loaded){
            return (<div></div>)
        }
        return(
            <EditorJs readOnly={true} data={this.state.grid} tools={EDITOR_JS_TOOLS}></EditorJs>
        )
        }
}

export class ArticlePreview2 extends React.Component{

     state = {
        id: this.props.match.params.name,
        dataType: "Redactor",
        requestUrl: "https://hse-cms.herokuapp.com",
        requestPath: "/api/publish/art/",
        loaded: false,
        task: null,
        comment: null,
        searchResult: [],
        usersSearch: null,
        article: {
            id: "",
            tasks: [],
            title: "",
            content: ''
        },
        data: {},
        grid: {}
    }

    componentDidMount(){
        let request = this.props.match.params.id;
        this.setState({comment: null});
        axios.get(
            this.state.requestUrl + this.state.requestPath + this.props.match.params.name)
            .then(res => {
                console.log(res);
                
                    this.setState({ article: res.data });
                    this.setState({ grid: JSON.parse(res.data.content) })
                    this.setState({ loaded: true })
                }
            )
            .catch(err => {
                console.log(err);

                switch (err.response.status) {
                    case 401: {
                        console.log("401");
                        break;
                    }
                    default: {
                        console.log("Undefined error");
                        break;
                    }
                }
            })
    }

    render(){
        if(!this.state.loaded){
            return (<div></div>)
        }
        return(
            <EditorJs readOnly={true} data={this.state.grid} tools={EDITOR_JS_TOOLS}></EditorJs>
        )
        }
}