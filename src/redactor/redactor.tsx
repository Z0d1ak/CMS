import React from 'react';
import './redactor.css';
import 'antd/dist/antd.css';
import { useDrag } from 'react-dnd'
import { useDrop } from 'react-dnd'
import { Button, Col, Row, notification, Card, Divider, Typography, Image } from 'antd';
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { useState } from 'react';
import DataEntity from "../base/contentOptions/dataEntities/dataEntity/dataEntity"
//import { DataRowEditable } from "../base/contentOptions/dataEntities/dataSubEntities/dataRow/dataRow"
//import '../base/contentOptions/dataEntities/dataSubEntities/dataRow/dataRow.css';
import {

    PlusOutlined
} from '@ant-design/icons';
import { Dropdown, Menu, message, Space } from "antd";
import {
    DeleteOutlined,
    CheckOutlined,
    CloseOutlined,
    CaretLeftOutlined,
    CaretRightOutlined,
    VerticalLeftOutlined,
    VerticalRightOutlined,  
    EditOutlined
} from '@ant-design/icons';
import axios from 'axios'
import { paths } from '../swaggerCode/swaggerCode';
import { RouteComponentProps } from 'react-router-dom'

const { Paragraph } = Typography;

type getArticle = paths["/api/Article/{id}"]["get"]["responses"]["200"]["content"]["application/json"]
type deleteArticle = paths["/api/Article/{id}"]["delete"]["parameters"]["path"]
type updateArticle = paths["/api/Article"]["put"]["requestBody"]["content"]["text/json"]
type addArticle = paths["/api/Article"]["post"]["requestBody"]["content"]["text/json"]


//Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiI1MWE4YjZmZC0wYWEwLTQ5MWUtOWMzNC1hZGRiZGZlNDgzMjQiLCJDb21wYW55SWQiOiJmZjA4Y2IzMS05YzBhLTQ1N2EtYTljNC0wNWYwNjZlMzAxYjUiLCJyb2xlIjoiQ29tcGFueUFkbWluIiwibmJmIjoxNjE2NDQ2NzYwLCJleHAiOjE2MTkwMzg3NjAsImlhdCI6MTYxNjQ0Njc2MH0.YbQtvyJpgWS6_V0k0dDtaEgJMut2v0JDT5TPeKEGWfzJ4c9U9C7DYmJjKmKqIw4J-hrldmyykeB4tB0AYm1xRw
//Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiJmMDdjM2E5My04MTU2LTRhZDAtOWY5ZC1iOTYyY2Q0MWI4ODEiLCJDb21wYW55SWQiOiJmZjA4Y2IzMS05YzBhLTQ1N2EtYTljNC0wNWYwNjZlMzAxYjUiLCJyb2xlIjoiQ2hpZWZSZWRhY3RvciIsIm5iZiI6MTYxNjQ0Njg4NywiZXhwIjoxNjE5MDM4ODg3LCJpYXQiOjE2MTY0NDY4ODd9.IU5baTAuSnm96nFmg81eTgNqjf1sH7wsdbxhF4mXP0KWYA9dK3F4mdHS_IwBPxcgNRnvnqfCexWVBqYirU9KJg

type cel = {
    x: number,
    y: number,
    width: number,
    content: string | null,
    cOpt: string[] | null,
    cOptVal: string[] | null
}


export class Redactor extends React.Component<RouteComponentProps<{ id: string }>, {}>{

    state = {
        id: this.props.match.params.id,
        dataType: "Redactor",
        requestUrl: "https://hse-cms.herokuapp.com",
        requestPath: "/api/Article/",
        loading: false,
        article: {
            id: "",
            tasks: [],
            title: "",
            content: '[[{"x":0,"y":0,"width":1,"content":null,"cOpt":null,"cOptVal":null},{"x":1,"y":0,"width":1,"content":null,"cOpt":null,"cOptVal":null},{"x":2,"y":0,"width":1,"content":null,"cOpt":null,"cOptVal":null},{"x":3,"y":0,"width":1,"content":null,"cOpt":null,"cOptVal":null},{"x":4,"y":0,"width":1,"content":null,"cOpt":null,"cOptVal":null},{"x":5,"y":0,"width":1,"content":null,"cOpt":null,"cOptVal":null},{"x":6,"y":0,"width":1,"content":null,"cOpt":null,"cOptVal":null},{"x":7,"y":0,"width":1,"content":null,"cOpt":null,"cOptVal":null},{"x":8,"y":0,"width":1,"content":null,"cOpt":null,"cOptVal":null},{"x":9,"y":0,"width":1,"content":null,"cOpt":null,"cOptVal":null},{"x":10,"y":0,"width":1,"content":null,"cOpt":null,"cOptVal":null},{"x":11,"y":0,"width":1,"content":null,"cOpt":null,"cOptVal":null},{"x":12,"y":0,"width":1,"content":null,"cOpt":null,"cOptVal":null},{"x":13,"y":0,"width":1,"content":null,"cOpt":null,"cOptVal":null},{"x":14,"y":0,"width":1,"content":null,"cOpt":null,"cOptVal":null},{"x":15,"y":0,"width":1,"content":null,"cOpt":null,"cOptVal":null},{"x":16,"y":0,"width":1,"content":null,"cOpt":null,"cOptVal":null},{"x":17,"y":0,"width":1,"content":null,"cOpt":null,"cOptVal":null},{"x":18,"y":0,"width":1,"content":null,"cOpt":null,"cOptVal":null},{"x":19,"y":0,"width":1,"content":null,"cOpt":null,"cOptVal":null},{"x":20,"y":0,"width":1,"content":null,"cOpt":null,"cOptVal":null},{"x":21,"y":0,"width":1,"content":null,"cOpt":null,"cOptVal":null},{"x":22,"y":0,"width":1,"content":null,"cOpt":null,"cOptVal":null},{"x":23,"y":0,"width":1,"content":null,"cOpt":null,"cOptVal":null}]]'
        },
        grid: [[{ x: 0, y: 0, width: 1, content: null, cOpt: null, cOptVal: null }]]
    }

    updateCallback = (content: cel[][]) => {
        this.setState({ grid: content })
    }


    updateData = (val: cel[][]) => {
        let buf = {
            id: this.state.article.id,
            title: this.state.article.title,
            content: JSON.stringify(val)
        }
        axios.put(this.state.requestUrl + this.state.requestPath, buf,
            {
                headers: {
                    "Authorization": "Bearer " + sessionStorage.getItem("AuthUserSecurityToken")
                }
            })
            .then(res => {
                notification.success({
                    message: 'Данные успешно обновлены',
                    description:
                        'Данные статьи с id:' + buf.id + " были успешно обновлены",
                });
            })
            .catch(err => {
                console.log(err);
                switch (err.response.status) {
                    case 401: {
                        notification.error({
                            message: 'Ошибка ' + err.response.status,
                            description:
                                "Ошибка авторизации"
                        });
                        break;
                    }
                    case 403: {
                        notification.error({
                            message: "Ошибка" + err.response.status,
                            description:
                                "Недостаточно прав для изменения данных статьи",
                        });
                        break;
                    }
                    case 404: {
                        notification.error({
                            message: "Ошибка" + err.response.status,
                            description:
                                'Статья с id:' + buf.id + " не найдена",
                        });
                        break;
                    }
                    case 409: {
                        notification.error({
                            message: 'Ошибка ' + err.response.status,
                            description:
                                "Конфликт данных, убедитесь что данные корректны и не дублируют существующие"
                        });
                        break;
                    }
                    default: {
                        notification.error({
                            message: 'Ошибка ' + err.response.status,
                            description:
                                "Неопознанная ошибка"
                        });
                        break;
                    }
                }
            })

    }

    update() {
        this.setState({ loading: true });
        let request: string = this.props.match.params.id;

        axios.get(
            this.state.requestUrl + this.state.requestPath + request,
            {
                headers: {
                    "Authorization": "Bearer " + sessionStorage.getItem("AuthUserSecurityToken")
                }
            }
        )
            .then(res => {
                //console.log(res);
                this.setState({ article: res.data });
                this.setState({ grid: JSON.parse(res.data.content) })
            })
            .catch(err => {
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



    render() {
        console.log("ID:");
        console.log(this.props.match.params.id);
        //  return(
        //      <ArticleV gridArticle={this.state.grid}/>        
        //  );
        return (
            <DndProvider backend={HTML5Backend}>

                <Row>

                    <Col span={24} >
                        <DataBlock articleData={this.state.article} />
                    </Col>

                </Row>

                <Row >
                    <Col span={1}></Col>
                    <Col span={16}>
                        <ArticleBlock updateCallback={this.updateCallback} save={this.updateData} gridArticle={this.state.grid} />
                    </Col>
                    <Col span={6}>
                        <OptionsBlock />
                    </Col>
                    <Col span={1}></Col>
                </Row>



            </DndProvider>
        );

    }
    componentDidMount() {
        this.update();
    }
}





export class DataBlock extends React.Component<{ articleData: any }, {}> {

    render() {
        console.log("!!!!!")
        console.log(this.props.articleData)
        return (

            <div className="dataPoolTop">
                <DataEntity
                    dataType={"task"}
                    loading={false}
                    updateDataCallback={() => { }}
                    deleteCallback={() => { }}
                    updateCallback={() => { }}
                    changeValueCallback={() => { }}
                    items={this.props.articleData.tasks} />
            </div>

        );
    }
}





export class TextBlock extends React.Component<{
    styleTypes: string[]
    styleValues: string[]
}, {}> {



    render() {
        return (
            <Typography.Paragraph className={"grey"}
                style={{
                    [this.props.styleTypes[1]]: this.props.styleValues[1],
                    [this.props.styleTypes[2]]: this.props.styleValues[2]
                }}>{this.props.styleValues[0]}</Typography.Paragraph>
        );
    }
}


export class ImgBlock extends React.Component<{
    styleTypes: string[],
    styleValues: string[]
}, {}> {



    render() {
        return (
            <Image className={"grey"}
                src={this.props.styleValues[0]}
                style={{
                    [this.props.styleTypes[1]]: this.props.styleValues[1] + "px",
                    [this.props.styleTypes[2]]: this.props.styleValues[2] + "px"
                }}></Image>
        );
    }
}


export class OptionsBlock extends React.Component<{}, {}> {
    render() {
        return (
            <Card className="partsPoolright">
                <BlockImg name={"text"} />
                <BlockImg name={"img"} />
                <BlockImg name={"text"} />
                <BlockImg name={"img"} />
            </Card>
        );
    }
}


const ItemTypes = {
    OPTION: 'option',
}


function BlockImg(props: { name: string }) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.OPTION,
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        }),
        item: { name: props.name }
    }))

    return (
        <div ref={drag} className="contentStyle">{props.name}</div>
    );
}

function Instuments(props: {
    cOpt: string[],
    cOptVal: string[],
    delete: () => void,
    edit: () => void,
    mvR: () => void,
    mvL: () => void,
    aR: () => void,
    rR: () => void,
    aL: () => void,
    rL: () => void,
    changeOption: (newOptVal: string[]) => void
}
) {
    const [visible, setVisible] = useState(false);

    return (
        <>
            <DeleteOutlined className={"deleteButton buttonStyle"} onClick={props.delete} />
            <EditOutlined className={"editButton buttonStyle"} onClick={() => setVisible(!visible)} />
            <CaretRightOutlined className={"moveRightButton buttonStyle"} onClick={props.mvR} />

            <CaretLeftOutlined className={"moveLeftButton buttonStyle"} onClick={props.mvL} />

            <VerticalLeftOutlined className={"addRightButton buttonStyle"} onClick={props.aR} />
            <VerticalRightOutlined className={"reduceRightButton buttonStyle"} onClick={props.rR} />
            <VerticalRightOutlined className={"addLeftButton buttonStyle"} onClick={props.aL} />
            <VerticalLeftOutlined className={"reduceLeftButton buttonStyle"} onClick={props.rL} />
            <Settings changeOption={props.changeOption} visible={visible} cOpt={props.cOpt} cOptVal={props.cOptVal}></Settings>
        </>
    );
}


export interface IDataRowE {
    dataStr: string
    titleStr: string
    typeName: string
    editFieldCallback: (val: string, param: string) => void;
}

export function DataRowEditable({ dataStr, titleStr, typeName, editFieldCallback }: IDataRowE) {
    const [editableStr, setEditableStr] = React.useState(dataStr);
    return (
        <Row className="DataRow">
            <Col span={4} className='title' >
                <Paragraph className='DataRowTitle'>{titleStr}</Paragraph>
            </Col>
            <Col span={1}></Col>
            <Col span={17}>
                <Paragraph className='DataRowData' editable={{
                    maxLength: 10000,
                    icon: <EditOutlined />,
                    tooltip: 'Изменить',
                    autoSize: { maxRows: 3, minRows: 1 },
                    onChange: (editableStr) => { setEditableStr(editableStr); editFieldCallback(editableStr, typeName); },
                }}>
                    {editableStr}
                </Paragraph>
            </Col>
        </Row>
    )
}


function Settings(props: {
    visible: boolean,
    cOpt: string[],
    cOptVal: string[],
    changeOption: (newOptVal: string[]) => void
}
) {



    return (
        props.visible ?
            <Card className={"settingsForm"} onClick={() => {/*console.log(props.cOpt)*/ }}>
                {props.cOptVal.map((r, i) => {
                    return (<DataRowEditable dataStr={props.cOptVal[i]} titleStr={props.cOpt[i] + ":"} typeName={"" + i}
                        editFieldCallback={(val: string, param: string) => editFieldCallback(val, param, props.cOptVal, props.changeOption)} />)
                })}
            </Card> :
            <></>
    );
}

function editFieldCallback(val: string, param: string, cOptVal: string[], changeOption: (newOptVal: string[]) => void) {

    let buf: string[] = cOptVal;
    var i: number = +param;
    buf[i] = val;
    changeOption(buf);

}

function Cell(props: {
    x: number, y: number, width: number,
    content: string | null,
    cOpt: string[] | null,
    cOptVal: string[] | null,
    edit: () => void,
    mvR: (x: number, y: number) => void,
    mvL: (x: number, y: number) => void,
    aR: (x: number, y: number) => void,
    rR: (x: number, y: number) => void,
    aL: (x: number, y: number) => void,
    rL: (x: number, y: number) => void,
    delete: (x: number, y: number) => void,
    insert: (x: number, y: number, item: string, cOpt: string[], cOptVal: string[]) => void,
    changeOption: (x: number, y: number, newOptVal: string[]) => void
}) {


    const [{ isOver }, drop] = useDrop(
        () => ({
            accept: "option",
            drop: (item: { name: string }) => {
                //console.log(item)
                switch (item.name) {
                    case 'text':
                        props.insert(props.x, props.y, "text", ["text", "font-size", "color"], ["text", "6px", "green"])
                        break;
                    case 'img':
                        props.insert(props.x, props.y, "img", ["img", "width", "height"], ["https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png", "100px", "150px"])
                        break;
                    default:
                        break;
                }

            },
            collect: (monitor) => ({
                isOver: !!monitor.isOver()
            }),
            hover: (item) => {

            }

        })
    )

    const [visible, setVisible] = useState(true);

    return (

        <Col span={props.width}>
            <div ref={drop} className="redactorCell" onClick={() => { if (props.content != null) setVisible(!visible); }}><>
                {(() => {
                    //console.log(props.content);
                    switch (props.content) {
                        case 'text':
                            return (<TextBlock styleTypes={props.cOpt!} styleValues={props.cOptVal!} />)
                        case 'img':
                            return (<ImgBlock styleTypes={props.cOpt!} styleValues={props.cOptVal!} />)
                        default:
                            return (<></>)
                    }
                })()}


            </>
            </div>
            {props.content !== null && visible ? <Instuments
                edit={props.edit}
                mvR={() => { props.mvR(props.x, props.y) }}
                mvL={() => { props.mvL(props.x, props.y) }}
                aR={() => { props.aR(props.x, props.y) }}
                rR={() => { props.rR(props.x, props.y) }}
                aL={() => { props.aL(props.x, props.y) }}
                rL={() => { props.rL(props.x, props.y) }}
                delete={() => { props.delete(props.x, props.y) }}
                cOpt={props.cOpt!}
                cOptVal={props.cOptVal!}
                changeOption={(newOptVal: string[]) => props.changeOption(props.x, props.y, newOptVal)}
            /> : <></>}
        </Col>


    );
}


export class ArticleV extends React.Component<RouteComponentProps<{ id: string }>, {}>{

    //extends React.Component<{gridArticle:cel[][]|null},{}> {
    state = {
        id: this.props.match.params.id,
        dataType: "Redactor",
        requestUrl: "https://hse-cms.herokuapp.com",
        requestPath: "/api/Article/",
        loading: false,
        article: {
            id: "",
            tasks: [],
            title: "",
            content: '[[{"x":0,"y":0,"width":1,"content":null,"cOpt":null,"cOptVal":null},{"x":1,"y":0,"width":1,"content":null,"cOpt":null,"cOptVal":null},{"x":2,"y":0,"width":1,"content":null,"cOpt":null,"cOptVal":null},{"x":3,"y":0,"width":1,"content":null,"cOpt":null,"cOptVal":null},{"x":4,"y":0,"width":1,"content":null,"cOpt":null,"cOptVal":null},{"x":5,"y":0,"width":1,"content":null,"cOpt":null,"cOptVal":null},{"x":6,"y":0,"width":1,"content":null,"cOpt":null,"cOptVal":null},{"x":7,"y":0,"width":1,"content":null,"cOpt":null,"cOptVal":null},{"x":8,"y":0,"width":1,"content":null,"cOpt":null,"cOptVal":null},{"x":9,"y":0,"width":1,"content":null,"cOpt":null,"cOptVal":null},{"x":10,"y":0,"width":1,"content":null,"cOpt":null,"cOptVal":null},{"x":11,"y":0,"width":1,"content":null,"cOpt":null,"cOptVal":null},{"x":12,"y":0,"width":1,"content":null,"cOpt":null,"cOptVal":null},{"x":13,"y":0,"width":1,"content":null,"cOpt":null,"cOptVal":null},{"x":14,"y":0,"width":1,"content":null,"cOpt":null,"cOptVal":null},{"x":15,"y":0,"width":1,"content":null,"cOpt":null,"cOptVal":null},{"x":16,"y":0,"width":1,"content":null,"cOpt":null,"cOptVal":null},{"x":17,"y":0,"width":1,"content":null,"cOpt":null,"cOptVal":null},{"x":18,"y":0,"width":1,"content":null,"cOpt":null,"cOptVal":null},{"x":19,"y":0,"width":1,"content":null,"cOpt":null,"cOptVal":null},{"x":20,"y":0,"width":1,"content":null,"cOpt":null,"cOptVal":null},{"x":21,"y":0,"width":1,"content":null,"cOpt":null,"cOptVal":null},{"x":22,"y":0,"width":1,"content":null,"cOpt":null,"cOptVal":null},{"x":23,"y":0,"width":1,"content":null,"cOpt":null,"cOptVal":null}]]'
        },
        grid: [[{ x: 0, y: 0, width: 1, content: null, cOpt: null, cOptVal: null }]]
    }

    update() {
        this.setState({ loading: true });
        let request: string = this.props.match.params.id;

        axios.get(
            this.state.requestUrl + this.state.requestPath + request,
            {
                headers: {
                    "Authorization": "Bearer " + sessionStorage.getItem("AuthUserSecurityToken")
                }
            }
        )
            .then(res => {
                //console.log(res);
                this.setState({ article: res.data });
                this.setState({ grid: JSON.parse(res.data.content) })
            })
            .catch(err => {
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

    render() {

        return (
            <div className="articleB" title="Макет саттьи">
                {this.state.grid!.map((r, i) => {
                    return (
                        <Row>
                            <Col span={1}></Col>
                            <Col span={22}>
                                <Row className={""}>
                                    {r.map((c, j) => {
                                        return (
                                            <Col span={c.width}>
                                                {(() => {
                                                    //console.log(props.content);
                                                    switch (c.content!) {
                                                        case 'text':
                                                            return (<TextBlock styleTypes={c.cOpt!} styleValues={c.cOptVal!} />)
                                                        case 'img':
                                                            return (<ImgBlock styleTypes={c.cOpt!} styleValues={c.cOptVal!} />)
                                                        default:
                                                            return (<></>)
                                                    }
                                                })()}
                                            </Col>

                                        );
                                    })}
                                </Row>
                            </Col>
                            <Col span={1}></Col>
                        </Row>
                    );
                })}
            </div>
        );
    }

    componentDidMount() {
        this.update();
    }
}




export class ArticleBlock extends React.Component<{ updateCallback: (content: cel[][]) => void, gridArticle: cel[][] | null, save: (content: cel[][]) => void }, {

}> {

    changeOption = (x: number, y: number, newOptVal: string[]) => {
        let buf: cel[][] = this.props.gridArticle!;
        buf[y][x].cOptVal = newOptVal;
        this.props.updateCallback(buf);
    }


    delete = (x: number, y: number) => {

        let buf: cel[][] = this.props.gridArticle!;
        let bufw = this.props.gridArticle![y][x].width;
        buf[y].splice(x, 1);
        for (let i = 0; i < bufw; i++) {
            let zel = {
                x: x + i,
                y: y,
                width: 1,
                content: null,
                cOpt: null,
                cOptVal: null
            }
            buf[y].splice(x + i, 0, zel);
        }
        for (var j = 0; j < buf[y].length; j++) {

            buf[y][j].x = j;
            buf[y][j].y = y;
        }
        this.props.updateCallback(buf);
    }
    edit = () => {
        console.log("edit");
    }
    mvR = (x: number, y: number) => {
        if (x + 1 < this.props.gridArticle![y].length) {
            let buf: cel[][] = this.props.gridArticle!;
            let gridel1: cel = buf[y][x + 1];
            gridel1.x = x;
            let gridel2: cel = buf[y][x];
            gridel2.x = x + 1;
            buf[y][x] = gridel1;
            buf[y][x + 1] = gridel2;
            for (var j = 0; j < buf[y].length; j++) {

                buf[y][j].x = j;
                buf[y][j].y = y;
            }
            this.props.updateCallback(buf);
        }
    }
    mvL = (x: number, y: number) => {
        if (x > 0) {
            let buf: cel[][] = this.props.gridArticle!;
            let gridel1: cel = buf[y][x - 1];
            gridel1.x = x;
            let gridel2: cel = buf[y][x];
            gridel2.x = x - 1;
            buf[y][x] = gridel1;
            buf[y][x - 1] = gridel2;
            for (var j = 0; j < buf[y].length; j++) {

                buf[y][j].x = j;
                buf[y][j].y = y;
            }
            this.props.updateCallback(buf);
        }
    }
    aR = (x: number, y: number) => {
        if (x + 1 < this.props.gridArticle![y].length)
            if (this.props.gridArticle![y][x + 1].content == null) {
                let buf: cel[][] = this.props.gridArticle!;
                let gridel: cel = buf[y][x];
                gridel.width = gridel.width + 1;
                buf[y].splice(x, 2, gridel);
                for (var j = 0; j < buf[y].length; j++) {

                    buf[y][j].x = j;
                    buf[y][j].y = y;
                }
                this.props.updateCallback(buf);
            }
    }
    rR = (x: number, y: number) => {
        if (this.props.gridArticle![y][x].width > 1) {
            let buf: cel[][] = this.props.gridArticle!;
            let gridel: cel = buf[y][x];
            gridel.width = gridel.width - 1;
            gridel.x = gridel.x;
            let el: cel = {
                x: x,
                y: y,
                width: 1,
                content: null,
                cOpt: null,
                cOptVal: null
            }
            buf[y].splice(x, 1, gridel, el);
            for (var j = 0; j < buf[y].length; j++) {

                buf[y][j].x = j;
                buf[y][j].y = y;
            }
            this.props.updateCallback(buf);
        }
    }
    aL = (x: number, y: number) => {
        if (x >= 1 && this.props.gridArticle![y][x - 1].content == null) {
            let buf: cel[][] = this.props.gridArticle!;
            let gridel: cel = buf[y][x];
            gridel.width = gridel.width + 1;
            gridel.x = gridel.x - 1;
            buf[y].splice(x - 1, 2, gridel);
            for (var j = 0; j < buf[y].length; j++) {

                buf[y][j].x = j;
                buf[y][j].y = y;
            }
            this.props.updateCallback(buf);
        }
    }
    rL = (x: number, y: number) => {
        if (this.props.gridArticle![y][x].width > 1) {
            let buf: cel[][] = this.props.gridArticle!;
            let gridel: cel = buf[y][x];
            gridel.width = gridel.width - 1;
            gridel.x = gridel.x + 1;
            let el: cel = {
                x: x,
                y: y,
                width: 1,
                content: null,
                cOpt: null,
                cOptVal: null
            }
            buf[y].splice(x, 1, el, gridel);
            for (var j = 0; j < buf[y].length; j++) {

                buf[y][j].x = j;
                buf[y][j].y = y;
            }
            this.props.updateCallback(buf);
        }
    }

    addRow = () => {
        let buf: cel[][] = this.props.gridArticle!;
        let gridRow: cel[] = []
        for (var j = 0; j < 24; j++) {
            let el: cel = {
                x: j,
                y: this.props.gridArticle!.length,
                width: 1,
                content: null,
                cOpt: null,
                cOptVal: null
            }
            gridRow.splice(j, 0, el);
        }
        buf.splice(this.props.gridArticle!.length + 1, 0, gridRow);
        this.props.updateCallback(buf);
    }

    deleteRow = (y: number) => {
        let buf: cel[][] = this.props.gridArticle!;
        buf.splice(y, 1);

        for (let i = 0; i < buf.length; i++) {
            for (let j = 0; j < buf[i].length; j++) {
                buf[i][j].y = i
            }
        }
        this.props.updateCallback(buf);
    }

    insert = (x: number, y: number, item: string, cOpt: string[], cOptVal: string[]) => {
        let buf: cel[][] = this.props.gridArticle!;
        let bufel = {
            x: x,
            y: y,
            width: this.props.gridArticle![y][x].width,
            content: item,
            cOpt: cOpt,
            cOptVal: cOptVal
        }
        buf[y][x] = bufel;
        for (var j = 0; j < buf[y].length; j++) {

            buf[y][j].x = j;
            buf[y][j].y = y;
        }
        this.props.updateCallback(buf);
    }


    update = () => {
        console.log(JSON.stringify(this.props.gridArticle!))
    }

    send = () => {
        console.log(JSON.stringify(this.props.gridArticle!))
    }
    /*insertComponent=(x:number,y:number,width:number,component:JSX.Element)=>{
        if(x+width>24) {x=24-width}
        let buf:JSX.Element[][]=this.state.grid;
        buf[y].splice(x,width,<Cell x={x} y={y} width={width} content={component} insertComponent={()=>{}} deleteComponent={this.deleteComponent}/>);
        this.setState({grid:buf})
    }*/




    constructor(props: { rows: number, updateCallback: (content: cel[][]) => void, cels: number, gridArticle: cel[][] | null, save: (content: cel[][]) => void }) {
        super(props);

        if (this.props.gridArticle !== null) {

        }
        else {
            let buf: cel[][] = []
            for (var i = 0; i < this.props.gridArticle!.length; i++) {
                let gridRow: cel[] = []
                for (var j = 0; j < 24; j++) {
                    let el: cel = {
                        x: j,
                        y: i,
                        width: 1,
                        content: null,
                        cOpt: null,
                        cOptVal: null
                    }
                    gridRow.splice(j, 0, el);
                }
                buf.splice(i, 0, gridRow);
                this.props.updateCallback(buf);
            }
            this.state = {
                rows: buf.length,
                cels: 24,
            }
        }
        // this.state.grid[3][3].content=ComponentsBlock[6];
        //this.state.grid[3][6].content=ComponentsBlock[6];
        // console.log(this.state.grid)
    }

    /*
    <Cell x={1} y={1} width={1} content={<>2</>}
                edit={this.edit}
                mvR={this.mvR}
                mvL={this.mvL}
                mvT={this.mvT}
                mvB={this.mvB}
                aR={this.aR}
                rR={this.rR}
                aL={this.aL}
                rL={this.rL}
                delete={this.delete}
    */

    render() {

        return (
            <Card className="articleBody" title="Макет статьи">
                {this.props.gridArticle!.map((r, i) => {
                    return (
                        <Row>
                            <Col span={1}></Col>
                            <Col span={22}>
                                <Row className={"redactorRow"}>
                                    {r.map((c, j) => {
                                        return (
                                            <Cell x={this.props.gridArticle![i][j].x} y={this.props.gridArticle![i][j].y} width={this.props.gridArticle![i][j].width}
                                                content={this.props.gridArticle![i][j].content}
                                                cOpt={this.props.gridArticle![i][j].cOpt}
                                                cOptVal={this.props.gridArticle![i][j].cOptVal}
                                                edit={this.edit}
                                                mvR={this.mvR}
                                                mvL={this.mvL}
                                                aR={this.aR}
                                                rR={this.rR}
                                                aL={this.aL}
                                                rL={this.rL}
                                                delete={this.delete}
                                                insert={this.insert}
                                                changeOption={this.changeOption}
                                            />

                                        );
                                    })}
                                    <DeleteOutlined className={"delRowButton"} type="dashed" onClick={() => this.deleteRow(i)} />
                                </Row>
                            </Col>
                            <Col span={1}></Col>
                        </Row>
                    )
                })}
                {this.props.gridArticle!.length}: {24}
                <Divider />

                <Row >
                    <Col span={1}></Col>

                    <Col span={22}>
                        <Button type="dashed" onClick={() => this.addRow()}>Add</Button>
                        <Button type="dashed" onClick={() => this.update()}>Update</Button>
                        <Button type="dashed" onClick={() => { console.log(JSON.stringify(this.props.gridArticle!)); this.props.save(this.props.gridArticle!) }}>Save</Button>
                    </Col>
                    <Col span={1}></Col>
                </Row>
            </Card>
        );
    }



}

export default { Redactor, ArticleV };

