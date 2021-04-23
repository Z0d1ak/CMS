import ReactDOM from "react-dom";
import React, { Component } from "react";
import { Row, Col, Card, Input, Button, AutoComplete, notification } from 'antd';
import EditorJs from "react-editor-js";
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';
import CheckList from '@editorjs/checklist';
import { getUser} from "../const/shared"
import 'antd/dist/antd.css';
import { EDITOR_JS_TOOLS } from './tools'
const { Option } = AutoComplete;

export class EditorCore extends React.Component{
    constructor(props){
        super(props);
        this.elements = props.data;
        if(!this.elements || this.elements == undefined){
            this.elements = []
        }
        console.log(this.elements);
        this.addFrame = this.addFrame.bind(this)
        this.addText = this.addText.bind(this)
        this.elementsDict = {};
        this.moveDownById = this.moveDownById.bind(this)
        this.moveUpById = this.moveUpById.bind(this)

        this.state =
        {
            data: this.elements
        }
    }

    async moveUpById(id){
        let el = this.elements.find(x => x.id == id);
        let ord = el.order;
        if(ord === 0){
            return;
        }

        let prevEl = this.elements.find(x => x.order = ord -1)

        prevEl.order = ord;
        el.order = ord - 1;
        await this.elementsDict[el.id]();
        await this.elementsDict[prevEl.id]();
        this.setState({data: this.elements.slice()})
    }

    async moveDownById(id){
        console.log(id)

        console.log(this.elements)
        let el = this.elements.find((x) => x.id === id);
        console.log(el)

        let ord = el.order;
        if(ord === this.elements.length){
            return;
        }

        let nextEl = this.elements.find((x) => x.order = ord + 1)
        console.log(nextEl)

        nextEl.order = ord;
        el.order = ord + 1;
        console.log(el)
        console.log(nextEl)
        console.log(this.elementsDict)
        await this.elementsDict[el.id]();
        await this.elementsDict[nextEl.id]();
        this.setState({data: this.elements.slice()})
    }

    removeById(id){

    }

    render(){
 
        return(
            <div>
                <Row>
                    <Col span={24}>
                        {console.log(this.state.data)}
                        <div>
                        {this.state.data.sort((l,r) => r.order - l.order).map(x => 
                                <div key={x.id}>
                                    {x.type === "text" &&
                                    <EditorJsElement 
                                        elDict={this.elementsDict}
                                        element={x}
                                        moveUpById={this.moveUpById}
                                        moveDownById={this.moveDownById}
                                        removeById={this.removeById}
                                        />}
                                    {x.type === "Frame" && <div></div>}
                                </div>
                            )}
                        
                            <Button onClick={this.addText}>Текст</Button>
                            <Button onClick={this.addFrame}>Внешний контент</Button>
                        </div>

                    </Col>
                    <Col span={1}>
                        
                    </Col>
                </Row>
            </div>
        )
    }

    addText(){
        this.elements.push(
            {
                id: uuidv4(),
                order: this.elements.length,
                type: "text",
                content: {}
            }
        )
        console.log("Elements")
        console.log(this.elements)
        this.setState({data: this.elements.slice()})

    }

    addFrame(){
        
        this.elements.push(
            {
                id: uuidv4(),
                order: this.elements.length,
                type: "frame",
                content: ""
            }
        )
        console.log("Elements")
        console.log(this.elements)
        this.setState({data: this.elements.slice()})
    }
}

class EditorJsElement extends React.Component{
    
    constructor(props){
        super(props)
        this.props = props;
        this.state = 
        {
            content: this.props.element.content
        }
        this.moveUp = this.moveUp.bind(this);
        this.moveDown = this.moveDown.bind(this);  
        this.remove = this.remove.bind(this); 
        this.save = this.save.bind(this)
        this.props.elDict[this.props.element.id] = this.save;
    }

    async save(){
        this.props.element.content = await this.instance.save();
    }

    remove(){
        this.props.removeById(this.props.element.id);
    }

    moveUp(){
        this.props.moveUpById(this.props.element.id)
    }

    moveDown(){
        this.props.moveDownById(this.props.element.id)
    }

    instance = null;

    render(){
        return(
            <div >
                {console.log("EditorJSREnder")}
                <EditorJs instanceRef={i => this.instance = i} data={this.state.data} tools={EDITOR_JS_TOOLS}/>
                <Button onClick={this.moveUp}>Вверх</Button>
                <Button onClick={this.moveDown}>Вниз</Button>
                <Button onClick={this.remove}>Удалить</Button>
            </div>
        )
    }
}