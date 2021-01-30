import React from 'react';
import 'antd/dist/antd.css';
import './TextCards.css';
import {
    SettingOutlined,
    DeleteOutlined,
    EllipsisOutlined,
    UpOutlined,
    CheckOutlined,

} from '@ant-design/icons';
import { Typography,Divider } from 'antd';
import {Avatar,Dropdown,Card,Popconfirm, message,Menu } from 'antd';
import { Row, Col } from 'antd';

import {DataRow,DataRowEditable,DataRowList,DataRowListEditable} from "../DataRow/DataRow";


const { Meta } = Card;



class Article{
    public ID!: string;
    public initiatorID!: string;
    public companyID!: string;
    public creationDate!: string;
    public statusArt!: string;
    public title!: string;
    public contest!: string;
}



export class CustomCard extends React.Component<{art:Article},{}> {

    state = {
        status:'narrow',
        ID: '',
        initiatorID: '',
        companyID: '',
        creationDate: '',
        statusArt: '',
        title: '',
        contest:'',
    };

    constructor(props:{art:Article}) {
        super(props);
        this.state.ID = this.props.art.ID;
        this.state.initiatorID = this.props.art.initiatorID;
        this.state.companyID = this.props.art.companyID;
        this.state.creationDate = this.props.art.creationDate;
        this.state.statusArt= this.props.art.statusArt;
        this.state.contest = this.props.art.contest;
        this.state.title = this.props.art.title;
    };



    expandCardChange = () => {
        if(this.state.status=='narrow')
            this.setState({ status: 'expand'});
        else
            this.setState({ status: 'narrow'});
    };

    makeEditableCardChange = () => {
        if(this.state.status=='expand')
            this.setState({ status: 'editable'});
        else
        {
            //this.updateCard();
            this.setState({ status: 'expand'});
        }
    };

    deleteCard = () => {
        message.info('Успешно удалено');

    };

    updateCard = (val:string) => {
        message.info('Изменения сохранены');
    };

    updateDataFieldCallBack = (val:string,param:string) => {
        this.setState({[param]:val});
    };

    updateListFieldCallBack = (val:string[],param:string) => {
        this.setState({[param]:val});
    };


    DataRows= ():JSX.Element[] =>{
        return (
            [
                <Divider />,
                <DataRow dataStr={this.state.statusArt} titleStr="Имя :"/>,
            ]
        )
    }

    DataRowsEditable=():JSX.Element[]=>{
        return (
            [<div/>]
        );
    }

    optionsNarrow=():JSX.Element[]=>{
        return (
            [<EllipsisOutlined onClick={()=>this.expandCardChange()}/>]
        )
    }

    optionsExpand=():JSX.Element[]=>{
        return (
            [<SettingOutlined onClick={()=>this.makeEditableCardChange()}/>,<UpOutlined onClick={()=>this.expandCardChange()}/>]
        )
    }

    optionsExpandEditable=():JSX.Element[]=>{
        return (
            [<Popconfirm placement="topLeft" title={"Вы точно хотите удалить этот объект?"} onConfirm={()=>this.deleteCard()} okText="Yes" cancelText="No"><DeleteOutlined/></Popconfirm>,<CheckOutlined onClick={()=>this.makeEditableCardChange()}/>]
    )
    }

    render() {
        return (
            <Card className="userCard wide"
                hoverable={true}
                actions={
                    this.state.status=="narrow"?this.optionsNarrow():this.state.status=="expand"?this.optionsExpand():this.optionsExpandEditable()
                }
            >
                <Meta
                    title={<div className="titleCard">{this.state.title}</div>}
                    description={<div className="titleDescriptionCard">{this.state.ID}</div>}
                />
                {this.state.status=="narrow"?<div/>:this.state.status=="expand"?this.DataRows():this.DataRowsEditable()}
            </Card>
        );
    }

}






export function GenerateCustomCardList({},{}) {
    let usersList:Article[] =GetArticlesList();
    return (
        <Row>
            <Col span={1}></Col>
            <Col span={22}>
            {usersList.map((u, i) => {
                return (<CustomCard art={u}/>)
            })}
            </Col>
            <Col span={1}></Col>
        </Row>
    )
}

export function GetArticlesList(): Article[] {
    let art: Article = new Article();
    art.ID = '123';
    art.initiatorID = '456';
    art.companyID = 'rcfrc';
    art.creationDate = 'rfcr';
    art.statusArt= 'rfc';
    art.contest = '34drc';
    art.title = 'testArt rfcrfcrfc    rfcrfcr  rfc';
    return  [art]
}

export default GenerateCustomCardList;